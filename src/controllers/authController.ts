import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database'

import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { env } from '../env'

export const singUp = async (request: Request, response: Response) => {
  const sinUpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
  })

  const { email, name, password } = sinUpSchema.parse(request.body)

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userExists) {
    throw Error('User already exists!')
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      name,
    },
  })

  response.status(201).json(user)
}

export const singIn = async (request: Request, response: Response) => {
  const singInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = singInSchema.parse(request.body)

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw Error('User or password incorect!')
  }

  const passwordHashd = compareSync(password, user.password)

  if (!passwordHashd) {
    throw Error('User or password incorect!')
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    env.JWT_SECRET,
  )

  response.status(201).json({ user, token })
}
