const express = require('express');
const errorHandler = require('./error-handler');
const pinoMiddleware = require('express-pino-logger');
const pino = require('pino')({ name: 'server' });
const { APP_PORT, NODE_ENV } = require('../config');

const app = express();

require('./router')(app);

app
  .use(pinoMiddleware())
  .use(errorHandler)
  .listen(APP_PORT, () => {
    pino.info(`
      App listening on port ${APP_PORT}
      Environment "${NODE_ENV.toUpperCase()}";
    `);
  });
