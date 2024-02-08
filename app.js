import express from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies';

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

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})
