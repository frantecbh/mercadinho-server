import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Working')
})

app.listen(3000, () => {
  console.log('server run o port 3000')
})
