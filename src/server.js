import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import apiRouter from './routes/apiRoutes'
<<<<<<< HEAD
import publicApiRouter from './routes/publicApiRoutes'
import authRouter from './routes/authRoutes'
=======
import shortUrlController from './controllers/shortUrlController'
>>>>>>> fba26c77f40057ed6fd477bcc57b458833a1a0d0

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/v1', authRouter)
app.use('/api/v1', publicApiRouter)
app.use('/api/v1', apiRouter)
app.get('/:shortUrl', shortUrlController.access)

app.listen()

export default app
