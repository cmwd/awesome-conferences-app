const express = require('express');
const errorHandler = require('./error-handler');
const info = require('debug')('collectors:info:server');

const app = express();
const { NODE_PORT } = process.env;

require('./router')(app);

app
  .use(errorHandler)
  .listen(NODE_PORT, () => {
    info(`App listening on port ${NODE_PORT}`);
  });
