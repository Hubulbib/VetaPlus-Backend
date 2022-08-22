export const getAll = () => {
    return [
        {
            '$project': {
                '_id': 0,
                'client': [
                    '$_id', '$name', '$phone', '$visits'
                ]
            }
        }
    ]
}