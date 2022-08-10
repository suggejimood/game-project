import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
//Router
import { gameProjectRouter } from './api/routers/game-project';
//Error
import { NotFoundError } from './submodules/core/errors/not-found';
import { errorHandler } from './submodules/functions/error_handler';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['X-Game-Token', 'info-device'],
    origin: []
}));

app.use('/v1', gameProjectRouter);

app.all('*',async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };