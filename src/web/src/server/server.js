import express from 'express';
import requestHandler from './request-handler';
import log from './logger';

express()
  .use(log.requestLogger())
  .use('/public', express.static('./public'))
  .use(requestHandler)
  .set('view engine', 'pug')
  .set('views', './src/server/views')
  .listen(process.env.NODE_PORT);
