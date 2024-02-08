import { Router } from 'express'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import { MovieModel } from '../models/movies.js'

export const moviesRouter = Router()

app.get('/', async(req, res) => {
  const { genre } = req.query
	const movies = await MovieModel.getAll({ genre })
	res.json(movies)
})

app.get('/:id', async (req, res) => {
	const { id } = req.params
	const movie = await MovieModel.getById(id)
	if (movie) return res.json(movie)
	
	res.status(404).json({ message: 'Movie not found' })
})

app.post('/', async (req, res) => {
	const result = validateMovie(req.body)
	
	if (result.error) {
		return res.status(400).json({ error: JSON.parse(result.error.message) })
	}
	
	const newMovie = await MovieModel.create(result.data)
	res.status(201).json(newMovie)
})

app.patch('/:id', async (req, res) => {
	const result = validatePartialMovie(req.body)
	
	if (result.error) {
		return res.status(400).json({ error: JSON.parse(result.error.message) })
	}
	
	const { id } = req.params
	const updateMovie = await MovieModel.update(id, result.data)
	
	return res.json(updateMovie)
})
