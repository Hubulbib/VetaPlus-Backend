import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import visitService from '../services/visit.service'

class VisitController {
    async getFinReport(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error // сделать обработку ошибок
            }
            const dayFrom = new Date(req.query.from.toString())
            const dayUntil = new Date(req.query.until.toString())

            const visitData = await visitService.getFinReport(dayFrom, dayUntil)

            res.json(visitData)

        } catch (err) {
            next(err)
        }
    }

    async getDay(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error // сделать обработку ошибок
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