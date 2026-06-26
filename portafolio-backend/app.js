import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';
import { HttpError } from './errors/HttpError.js';
import {
    errorHandler,
    notFoundHandler
} from './middleware/errorHandlers.js';
import { apiRateLimiter } from './middleware/security.js';
import router from './routes/api.js';

const app = express();

app.disable('x-powered-by');

if (env.trustProxy !== false) {
    app.set('trust proxy', env.trustProxy);
}

app.use(helmet());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || env.corsOrigins.includes(origin.replace(/\/+$/, ''))) {
                return callback(null, true);
            }

            return callback(new HttpError(403, 'Origen de solicitud no permitido.'));
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept'],
        credentials: false,
        maxAge: 86_400,
        optionsSuccessStatus: 204
    })
);

app.use('/api', apiRateLimiter);
app.use(express.json({ limit: '100kb' }));
app.use(
    express.urlencoded({
        extended: false,
        limit: '100kb'
    })
);

app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
