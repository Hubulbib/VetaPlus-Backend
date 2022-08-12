import { Router } from 'express'
import { query } from 'express-validator'
import visitController from '../controllers/visit.controller'

const router = Router()

router.get(
    '/summary',
    [
        query(['from', 'until']).isDate()
    ],
    visitController.getFinReport
)

router.get(
    '/day',
    [
        query('date').isDate()
    ],
    visitController.getDay
)

export default router