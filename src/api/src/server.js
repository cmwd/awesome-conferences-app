const express = require('express');
const errorHandler = require('./error-handler');
const database = require('./database');
const pinoMiddleware = require('express-pino-logger');
const pino = require('pino')({ name: 'server' });
const { process } = require('global');

const APP_PORT = process.env.NODE_PORT;
const app = express()
  .use(pinoMiddleware());

require('./router')(app);

database();

app
  .use(errorHandler)
  .listen(APP_PORT, pino.info(`Server connected at ${APP_PORT}`));
