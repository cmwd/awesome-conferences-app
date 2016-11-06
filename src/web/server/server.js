import express from 'express';
import pinoMiddleware from 'express-pino-logger';
import nodeFetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import logger from 'logger';
import authenticationHandler from './authentication-handler';
import requestHandler from './request-handler';
import { APP_PORT, NODE_ENV } from 'config';
import { setImplementation } from '../common/utils/fetch';
import tokenHandler from './token-handler';
import requestPocket from './request-pocket';
import './services/authentication';

setImplementation(nodeFetch);

express()
  .use('/public', express.static('./public'))
  .set('view engine', 'pug')
  .set('views', './server/views')
  .use(pinoMiddleware({ logger }))
  .use('/user/', authenticationHandler)
  .use(requestPocket())
  .use(cookieParser())
  .use(tokenHandler())
  .use(requestHandler())
  .listen(APP_PORT, () => {
    logger.info(`
      Server connected at "${APP_PORT}";
      Environment "${NODE_ENV.toUpperCase()}".
    `);
  });
