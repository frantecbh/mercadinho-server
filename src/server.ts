import express from 'express'
import { env } from './env'

const app = express()

app.get('/', (req, res) => {
  res.send('Working')
})

app.listen(env.PORT, () => {
  console.log(`server run ${env.PORT}`)
})
