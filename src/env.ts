import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
