const express = require('express');
const database = require('./database');
const pinoMiddleware = require('express-pino-logger');
const logger = require('logger');
const { APP_PORT, NODE_ENV } = require('config');

const app = express()
  .use(pinoMiddleware({ logger }));

require('router')(app);

database({
  logger,
  onConnect() {
    app
      .listen(APP_PORT, () => {
        logger.info(`
          Server connected at "${APP_PORT}";
          Environment "${NODE_ENV.toUpperCase()}";
        `);
      });
  },
  onError(err) {
    logger.error(err);
    process.exit(1);
  },
});

module.exports = app;
