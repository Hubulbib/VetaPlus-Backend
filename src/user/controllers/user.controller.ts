import {NextFunction, Request, Response} from 'express'
import {validationResult} from 'express-validator'
import {UserError} from '../exceptions/user.error'
import userService from "../services/user.service";


class UserController {
    async getByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(UserError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }

            const dayFrom = new Date(req.query.from.toString())
            const dayUntil = new Date(req.query.until.toString())
            const userId = req['user'].id

            const userData = await userService.getByDate(dayFrom, dayUntil, userId)

            res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(UserError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }

            const date = new Date(req.body.date)
            const amount = req.body.amount
            const text = req.body.text || ''
            const userId = req['user'].id

            const userData = await userService.create(date, amount, text, userId)

            res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(UserError.BadRequest('Ошибка в заполненных данных', errors.array()))
            }

            const expenseId = req.params['id']
            const amount = req.body.amount
            const text = req.body.text || ''
            const userId = req['user'].id

            const userData = await userService.edit(expenseId, amount, text, userId)

            res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const expenseId = req.params['id']
            const userId = req['user'].id

            const userData = await userService.delete(expenseId, userId)

            res.json(userData)
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController