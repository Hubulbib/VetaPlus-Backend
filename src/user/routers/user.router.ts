import {Router} from 'express'
import {body, query} from 'express-validator'
import userController from '../controllers/user.controller'

const router = Router()

router.get('/expenses/get', [
    query(['from', 'until']).isDate()
], userController.getByDate)

router.post('/expenses/create', [
    body('date').isDate(),
    body('amount').isCurrency(),
    body('text').optional({nullable: true, checkFalsy: true}).isString()
], userController.create)

router.patch('/expenses/:id/edit', [
    body('amount').optional({nullable: true, checkFalsy: true}).isCurrency(),
    body('text').optional({nullable: true, checkFalsy: true}).isString()
], userController.edit)

router.delete('/expenses/:id/delete', userController.delete)


export default router