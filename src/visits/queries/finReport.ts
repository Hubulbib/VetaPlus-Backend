export const finReport = (from: Date, until: Date, operation) => {

    const segmentDate = (type: string) => {
        if (type === 'from') {
            let dateFrom = (new Date(from.getTime()))
            dateFrom = new Date(`${dateFrom.getMonth() + 1} ${dateFrom.getDate()}, ${dateFrom.getFullYear()} 03:00:00`)
            return dateFrom
        } else if (type === 'until'){
            let dateUntil = (new Date(until.getTime() + 24 * 60 * 60 * 1000))
            dateUntil = new Date(`${dateUntil.getMonth() + 1} ${dateUntil.getDate()}, ${dateUntil.getFullYear()} 02:59:59`)
            return dateUntil
        }
    }

    if (operation === 'clients') {
        return [
            {
                '$project': {
                    'visits': {
                        '$filter': {
                            'input': '$visits',
                            'as': 'dt',
                            'cond': {
                                '$and': [
                                    {
                                        '$gte': [
                                            '$$dt.date', new Date(segmentDate('from').toISOString())
                                        ]
                                    }, {
                                        '$lte': [
                                            '$$dt.date', new Date(segmentDate('until').toISOString())
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {
            '$unwind': {
                'path': '$visits'
            }
        }, {
            '$group': {
                '_id': {
                    'date': {
                        '$dateToString': {
                            'format': '%Y-%m-%d',
                            'date': '$visits.date'
                        }
                    }
                },
                'clients': {
                    '$count': {}
                }
            }
        }
        ]
    }

    return [
        {
            '$project': {
                'visits': {
                    '$filter': {
                        'input': '$visits',
                        'as': 'dt',
                        'cond': {
                            '$and': [
                                {
                                    '$gte': [
                                        '$$dt.date', new Date(segmentDate('from').toISOString())
                                    ]
                                }, {
                                    '$lte': [
                                        '$$dt.date', new Date(segmentDate('until').toISOString())
                                    ]
                                }, {
                                    $eq: ['$$dt.payType', operation === 'cash' ? 'НАЛ' : 'БЕЗНАЛ']
                                }
                            ]
                        }
                    }
                }
            }
        }, {
            '$unwind': {
                'path': '$visits'
            }
        }, {
            '$group': {
                '_id': {
                    'date': {
                        '$dateToString': {
                            'format': '%Y-%m-%d',
                            'date': '$visits.date'
                        }
                    }
                },
                'paySum': {
                    '$sum': '$visits.paySum'
                },
            }
        }
    ]
}