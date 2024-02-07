import express from 'express'
import { readJSON } from './utils.js'

const app = express()
app.disable('x-powered-by')

const movies = readJSON('./movies.json')

app.get('/movies', (req, res) => {
  res.json(movies)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})
