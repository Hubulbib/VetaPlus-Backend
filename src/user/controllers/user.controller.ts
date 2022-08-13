import { NextFunction, Request, Response } from 'express'

class UserController {
    async getData(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ userData: req['user'] })
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController()