import { Router } from 'express'
import { readJSON } from './utils.js'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

export const moviesRouter = Router()

const movies = readJSON('./movies.json')

app.get('/', (req, res) => {
  const { genre } = req.query
	if (genre) {
		const filteredMovies = movies.filter(
			movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
		)
		
		return res.json(filteredMovies)
	}
	
	return res.json(movies)
})

app.get('/:id', (req, res) => {
	const { id } = req.params
	const movie = movies.find(movie => movie.id === id)
	if (movie) return res.json(movie)
	
	res.status(404).json({ message: 'Movie not found' })
})

app.post('/', (req, res) => {
	const result = validateMovie(req.body)
	
	if (result.error) {
		return res.status(400).json({ error: JSON.parse(result.error.message) })
	}
	
	const newMovie = {
		id: crypto.randomUUID(),
		...result.data
	}
	
	movies.push()
	res.status(201).json(newMovie)
})

app.patch('/:id', (req, res) => {
	const result = validatePartialMovie(req.body)
	
	if (result.error) {
		return res.status(400).json({ error: JSON.parse(result.error.message) })
	}
	
	const { id } = req.params
	const movieIndex = movies.findIndex(movie => movie.id === id)
	
	if (movieIndex === -1) {
		return res.status(404).json({ message: 'Movie not found' })
	}
	
	const updateMovie = {
		...movies[movieIndex],
		...result.data
	}
	
	return res.json(updateMovie)
})
