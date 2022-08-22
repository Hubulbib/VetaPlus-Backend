import { Router } from 'express'
import { body } from 'express-validator'
import clientController from '../controllers/client.controller'

const router = Router()

router.post(
    '/create',
    [
        body('name').exists().notEmpty(),
        body('phone').isMobilePhone('ru-RU')
    ],
    clientController.create
)
router.get('/get/:id', clientController.get)
router.get('/get-all', clientController.getAll)
router.patch(
    '/edit/:id',
    [
        body('params').exists().isObject().notEmpty()
    ],
    clientController.edit)
router.delete('/delete/:id', clientController.delete)

export default router