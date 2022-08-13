import { Router } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

router.get('/get-data', userController.getData)

export default router