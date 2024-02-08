import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

app.get('/', MovieController.getAll)
app.get('/:id', MovieController.getById)
app.post('/', MovieController.create)
app.put('/:id', MovieController.update)
