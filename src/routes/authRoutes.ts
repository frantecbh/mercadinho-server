import { Router } from 'express'
import { singUp, singIn } from '../controllers/authController'

export const authRouter = Router()

authRouter.post('/signup', singUp)
authRouter.post('/signIn', singIn)
