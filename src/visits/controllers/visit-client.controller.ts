import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { VisitError } from '../exceptions/visit.error'
import visitClientService from '../services/visit-client.service'


class VisitClientController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(VisitError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }
            const clientId = req.params['id']
            const visitReq = req.body

            const visitData = await visitClientService.create({ clientId, ...visitReq })

            res.status(201).json(visitData)

        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const clientId = req.params['id']

            const visitData = await visitClientService.getAll(clientId)

            res.status(200).json(visitData)

        } catch (err) {
            next(err)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(VisitError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }

            const clientId = req.params['id']
            const visitId = req.params['visitId']
            const visitReq = req.body

            const visitData = await visitClientService.edit({ clientId, visitId, ...visitReq })

            res.status(200).json(visitData)

        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const clientId = req.params['id']
            const visitId = req.params['visitId']

            const visitData = await visitClientService.delete(clientId, visitId)

            res.status(200).json(visitData)

        } catch (err) {
            next(err)
        }
    }
}

export default new VisitClientController()