import { Request, Response } from 'express'
import { ClientError } from '../../clients/exceptions/client.error'
import { VisitError } from '../../visits/exceptions/visit.error'
import { ApiError } from '../exceptions/api.error'
import { UserError } from '../../user/exceptions/user.error'

export default function (err, req: Request, res: Response) {
    console.log(err)
    if (err instanceof ApiError || err instanceof ClientError || err instanceof VisitError
        || err instanceof UserError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}