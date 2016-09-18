import express from 'express';
import requestHandler from './request-handler';
import pinoLogger from 'pino';
import pinoMiddleware from 'express-pino-logger';
import CONFIG from '../../config';

const pino = pinoLogger({ name: 'server' });
express()
  .use(pinoMiddleware())
  .use('/public', express.static('./public'))
  .set('view engine', 'pug')
  .set('views', './src/server/views')
  .use(requestHandler)
  .listen(CONFIG.APP_PORT, () => {
    pino.info(`
      Server connected at "${CONFIG.APP_PORT}";
      Environment "${CONFIG.NODE_ENV.toUpperCase()}".
    `);
  });
