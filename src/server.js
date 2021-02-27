import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import apiRouter from './routes/apiRoutes';
import publicApiRouter from './routes/publicApiRoutes';
import authRouter from './routes/authRoutes';

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
// app.use(bodyParser.json());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', publicApiRouter);
app.use('/api/v1', apiRouter);
// app.get('/:shortUrl', shortUrlController.retrieve)

app.listen();

export default app;
