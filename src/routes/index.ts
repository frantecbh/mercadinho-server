import { Router } from 'express'
import { authRouter } from './authRoutes'

export const routes = Router()

routes.use('/auth', authRouter)
