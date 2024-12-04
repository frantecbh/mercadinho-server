import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database'

import { compareSync, hashSync } from 'bcrypt'

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
