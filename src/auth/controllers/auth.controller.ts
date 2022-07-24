import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import userService from '../services/user.service'
import { ApiError } from '../exceptions/api.error'
import { ResponseTokenDto } from '../dtos/response-token.dto'

class AuthContoller {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { username, password } = req.body
            const userData = await userService.register(username, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(new ResponseTokenDto(userData))
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            const userData = await userService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(new ResponseTokenDto(userData))
        } catch (err) {
            next(err)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (err) {
            next(err)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(new ResponseTokenDto(userData))
        } catch (err) {
            next(err)
        }
    }
}

export default new AuthContoller()