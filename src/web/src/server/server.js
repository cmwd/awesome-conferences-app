import express from 'express';
import pinoLogger from 'pino';
import pinoMiddleware from 'express-pino-logger';
import nodeFetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import authenticationHandler from './authentication-handler';
import requestHandler from './request-handler';
import CONFIG from '../../config';
import { setImplementation } from '../common/utils/fetch';
import tokenHandler from './token-handler';
import requestPocket from './request-pocket';
import './services/authentication';

setImplementation(nodeFetch);
const logger = pinoLogger({ name: 'server' });

express()
  .use('/public', express.static('./public'))
  .set('view engine', 'pug')
  .set('views', './src/server/views')
  .use(pinoMiddleware({ logger }))
  .use('/user/', authenticationHandler)
  .use(requestPocket())
  .use(cookieParser())
  .use(tokenHandler())
  .use(requestHandler())
  .listen(CONFIG.APP_PORT, () => {
    logger.info(`
      Server connected at "${CONFIG.APP_PORT}";
      Environment "${CONFIG.NODE_ENV.toUpperCase()}".
    `);
  });
