import express from 'express';
import { env } from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', 3001));

export const setupServer = () => {
  const app = express();

  app.use((req, res, next) => {
    if (req.is('application/json')) {
      express.json()(req, res, next);
    } else {
      next();
    }
  });

  app.use(cookieParser());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
