import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ClientDto } from '../dtos/response-client.dto'
import clientService from '../services/client.service'

class ClientContoller {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error // сделать обработку ошибок
            }
            const { name, phone } = req.body
            const clientData = await clientService.create(name, phone)

            return res.status(201).json(clientData)

        } catch (err) {
            next(err)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params['id']

            const clientData = await clientService.get(id)

            return res.json(new ClientDto(clientData))

        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params['id']

            const clientData = await clientService.delete(id)

            return res.json(clientData)

        } catch (err) {
            next(err)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error // сделать обработку ошибок
            }
            const id = req.params['id']
            const { params } = req.body

            const clientData = await clientService.edit(id, params)

            return res.json(clientData)

        } catch (err) {
            next(err)
        }
    }
}

export default new ClientContoller()