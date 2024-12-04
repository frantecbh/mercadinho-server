import { Router } from 'express'
import { login } from '../controllers/authController'

export const authRouter = Router()

authRouter.get('/login', login)