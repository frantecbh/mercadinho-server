import express from 'express'
import { env } from './env'
import { routes } from './routes'

const app = express()

app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Working')
})

app.listen(env.PORT, () => {
  console.log(`server run ${env.PORT}`)
})
