import { Router } from 'express'
import { singUp } from '../controllers/authController'

export const authRouter = Router()

authRouter.post('/signup', singUp)
