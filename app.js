import express from 'express'
import { readJSON } from './utils.js'

const app = express()
app.disable('x-powered-by')

const movies = readJSON('./movies.json')

app.get('/movies', (req, res) => {
  const { genre } = req.query
	if (genre) {
		const filteredMovies = movies.filter(
			movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
		)
		
		return res.json(filteredMovies)
	}
	
	return res.json(movies)
})

app.get('/movies/:id', (req, res) => {
	const { id } = req.params
	const movie = movies.find(movie => movie.id === id)
	if (movie) return res.json(movie)
	
	res.status(404).json({ message: 'Movie not found' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})