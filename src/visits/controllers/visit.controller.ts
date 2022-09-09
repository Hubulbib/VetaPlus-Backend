import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { VisitError } from '../exceptions/visit.error'
import visitService from '../services/visit.service'

class VisitController {
    async getFinReport(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(VisitError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }
            const dayFrom = new Date(req.query.from.toString())
            const dayUntil = new Date(req.query.until.toString())
            const operation = req.query.operation.toString()

            const visitData = await visitService.getFinReport(dayFrom, dayUntil, operation)

            res.json(visitData)

        } catch (err) {
            next(err)
        }
    }

    async getDay(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(VisitError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }
            const date = new Date(req.query.date.toString())

            const visitData = await visitService.getDay(date)

            res.json(visitData)

        } catch (err) {
            next(err)
        }
    }
}

export default new VisitController()