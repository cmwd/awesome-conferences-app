const express = require('express');
const errorHandler = require('./error-handler');
const database = require('./database');
const pinoMiddleware = require('express-pino-logger');
const pino = require('pino')({ name: 'server' });
const { APP_PORT, NODE_ENV } = require('../config');

const app = express()
  .use(pinoMiddleware());

require('./router')(app);

database({
  onConnect() {
    app
      .use(errorHandler)
      .listen(APP_PORT, () => {
        pino.info(`
          Server connected at "${APP_PORT}";
          Environment "${NODE_ENV.toUpperCase()}";
        `);
      });
  },
  onError(err) {
    pino.error(err);
    process.exit(1);
  },
});

