import { readJSON } from './utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
	static async getAll({ genre }) {
		if (genre) {
			return movies.filter(
				movie => movie.genre.some(g => g.toLowerCase() === genre.toLoweCase())
			)
		}
		
		return movies
	}

  static async getById(id) {
    return movies.find(movie => movie.id === id)
  }

  static async create(movie) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movie
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update(id, movie) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return null
    const updatedMovie = {
      ...movies[movieIndex],
      ...movie
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }
}