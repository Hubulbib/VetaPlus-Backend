export const receptionDay = (day: Date) => {

    const segmentDate = (type: string) => {
        if (type === 'gt') {
            let dateFrom = (new Date(day.getTime() - 24 * 60 * 60 * 1000))
            dateFrom = new Date(`${dateFrom.getMonth() + 1} ${dateFrom.getDate()}, ${dateFrom.getFullYear()} 02:59:59`)
            return dateFrom
        } else if (type === 'lt') {
            let dateFrom = (new Date(day.getTime() + 24 * 60 * 60 * 1000))
            dateFrom = new Date(`${dateFrom.getMonth() + 1} ${dateFrom.getDate()}, ${dateFrom.getFullYear()} 02:59:59`)
            return dateFrom
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
                    '$gt': segmentDate('gt'),
                    '$lt': segmentDate('lt')
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