import express from 'express';
import requestHandler from './request-handler';
import pinoLogger from 'pino';
import pinoMiddleware from 'express-pino-logger';
import CONFIG from '../../config';

const logger = pinoLogger({ name: 'server' });

express()
  .use(pinoMiddleware({ logger }))
  .use('/public', express.static('./public'))
  .set('view engine', 'pug')
  .set('views', './src/server/views')
  .use(requestHandler)
  .listen(CONFIG.APP_PORT, () => {
    logger.info(`
      Server connected at "${CONFIG.APP_PORT}";
      Environment "${CONFIG.NODE_ENV.toUpperCase()}".
    `);
  });
