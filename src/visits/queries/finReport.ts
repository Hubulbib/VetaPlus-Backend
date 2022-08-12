export const finReport = (from: Date, until: Date) => {
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
                                        '$$dt.date', from
                                    ]
                                }, {
                                    '$lte': [
                                        '$$dt.date', until
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
                    'day': {
                        '$dateToString': {
                            'format': '%Y-%m-%d',
                            'date': '$visits.date'
                        }
                    }
                },
                'paySum': {
                    '$sum': '$visits.paySum'
                },
                'clients': {
                    '$count': {}
                }
            }
        }
    ]
}