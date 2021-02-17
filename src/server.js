import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import apiRouter from './routes/apiRoutes'
import shortUrlController from './controllers/shortUrlController'

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/v1', apiRouter)
app.get('/:shortUrl', shortUrlController.access)



app.listen()

export default app
