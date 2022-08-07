import { Router } from 'express'
import { body } from 'express-validator'
import visitClientController from '../controllers/visit-client.controller'

const router = Router()

// /api/client/:id/visit
router.post(
    '/:id/visit/create',
    [
        body('pet').exists().notEmpty(),
        body('nickname').exists().notEmpty(),
        body('age').exists().notEmpty().isInt(),
        body('gender').exists().notEmpty(),
        body('disease').exists().notEmpty(),
        body('treatment').exists().notEmpty(),
        body('payType').exists().notEmpty(),
        body('paySum').exists().notEmpty().isCurrency(),
    ],
    visitClientController.create
)

router.get('/:id/visit/get-all', visitClientController.getAll)

router.patch(
    '/:id/visit/edit/:visitId',
    [
        body('pet').exists(),
        body('nickname').exists(),
        body('age').exists(),
        body('gender').exists(),
        body('disease').exists(),
        body('treatment').exists(),
        body('payType').exists(),
        body('paySum').exists(),
    ],
    visitClientController.edit)

router.delete('/:id/visit/delete/:visitId', visitClientController.delete)

export default router