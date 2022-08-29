import { Router } from 'express'
import { body } from 'express-validator'
import visitClientController from '../controllers/visit-client.controller'

const router = Router()

// /api/client
router.post(
    '/:id/visit/create',
    [
        body(['pet', 'nickname', 'gender', 'disease', 'treatment', 'payType']).exists().notEmpty(),
        body('paySum').exists().notEmpty().isCurrency(),
        body('age').exists().notEmpty().isInt(),
    ],
    visitClientController.create
)

router.get('/:id/visit/get-all', visitClientController.getAll)

router.patch(
    '/:id/visit/edit/:visitId',
    [
        body(['pet', 'nickname', 'age', 'gender', 'disease', 'treatment', 'payType', 'paySum']).exists()
    ],
    visitClientController.edit)

router.delete('/:id/visit/delete/:visitId', visitClientController.delete)

export default router