import express from 'express';
import pinoMiddleware from 'express-pino-logger';
import nodeFetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import logger from 'logger';
import router from './middleware/router';
import { APP_PORT, NODE_ENV } from 'config';
import { setImplementation } from '../common/service/fetch';
import tokenHandler from './token-handler';
import requestPocket from './middleware/request-pocket';
import './services/authentication';

setImplementation(nodeFetch);

const app = express();

app
  .use('/public', express.static('./public'))
  .set('view engine', 'pug')
  .set('views', './server/views')
  .use(pinoMiddleware({ logger }))
  .use(requestPocket())
  .use(cookieParser())
  .use(tokenHandler())
  .use(router(app))
  .listen(APP_PORT, () => {
    logger.info(`
      Server connected at "${APP_PORT}";
      Environment "${NODE_ENV.toUpperCase()}".
    `);
  });
