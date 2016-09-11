const express = require('express');
const errorHandler = require('./error-handler');
const database = require('./database');
const info = require('debug')('api:info:server');
const { process } = require('global');
const { requestPocket } = require('./request-pocket');

const APP_PORT = process.env.NODE_PORT;
const app = express()
  .use(requestPocket);

require('./response-config')(app);
require('./router')(app);

database();

app
  .use(errorHandler)
  .listen(APP_PORT, () => {
    info(`App listening on port ${APP_PORT}`);
  });
