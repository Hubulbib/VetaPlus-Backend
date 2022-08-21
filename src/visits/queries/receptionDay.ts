export const receptionDay = (day: Date) => {

    const segmentDate = (type: string) => {
        if (type === 'gte') {
            let dateFrom = (new Date(day.getTime()))
            dateFrom = new Date(`${dateFrom.getMonth() + 1} ${dateFrom.getDate()}, ${dateFrom.getFullYear()} 03:00:00`)
            return dateFrom
        } else if (type === 'lte') {
            let dateUntil = (new Date(day.getTime() + 24 * 60 * 60 * 1000))
            dateUntil = new Date(`${dateUntil.getMonth() + 1} ${dateUntil.getDate()}, ${dateUntil.getFullYear()} 02:59:59`)
            return dateUntil
        }
    }


    return [
        {
            '$unwind': {
                'path': '$visits'
            }
        }, {
            '$match': {
                'visits.date': {
                    '$gte': new Date((segmentDate('gte')).toISOString()),
                    '$lte': new Date((segmentDate('lte')).toISOString())
                }
            }
        }, {
            '$set': {
                'time': {
                    '$dateToString': {
                        'format': '%H-%M',
                        'date': '$visits.date'
                    }
                }
            }
        }, {
            '$project': {
                'client_id': '$_id',
                '_id': '$visits._id',
                'time': '$time',
                'name': '$name',
                'phone': '$phone',
                'pet': '$visits.pet',
                'disease': '$visits.disease',
                'payType': '$visits.payType',
                'paySum': '$visits.paySum',
                'details': {
                    'date': '$visits.date',
                    'nickname': '$visits.nickname',
                    'gender': '$visits.gender',
                    'age': '$visits.age',
                    'treatment': '$visits.treatment'
                }
            }
        }
    ]
}