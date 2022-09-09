import {Types} from 'mongoose'

export const getByDate = (userId: string, from: Date, until: Date) => {
    return [
        {
            '$match': {
                '_id': new Types.ObjectId(userId)
            }
        }, {
            '$project': {
                'expenses': {
                    '$filter': {
                        'input': '$expenses',
                        'as': 'dt',
                        'cond': {
                            '$and': [
                                {
                                    '$gte': [
                                        '$$dt.date', new Date(from.toISOString())
                                    ]
                                }, {
                                    '$lte': [
                                        '$$dt.date', new Date(until.toISOString())
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]
}