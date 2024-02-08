import express from 'express'
import cors from 'cors'
import { readJSON } from './utils.js'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

const app = express()
app.disable('x-powered-by')
app.use(express.json());

app.use(cors({
		origin: (origin, callback) => {
			const ACCEPTED_ORIGINS = [
				'http://localhost:8080',
				'http://localhost:1234',
			]
			
			if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
				return callback(null, true)
			}
			
			return callback(new Error('Not Allowed by CORS'))
		}
	})
)

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

app.post('/movies', (req, res) => {
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

app.patch('/movies/:id', (req, res) => {
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
