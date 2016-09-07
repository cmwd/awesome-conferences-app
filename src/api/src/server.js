const express = require('express');
const router = require('./router');
const database = require('./database');
const responseConfig = require('./response-config');
const info = require('debug')('api:info:server');
const { process } = require('global');
const { requestPocket } = require('./request-pocket');

const APP_PORT = process.env.NODE_PORT;
const app = express()
  .use(requestPocket);

responseConfig(app);
router(app);
database();

app.listen(APP_PORT, () => {
  info(`App listening on port ${APP_PORT}`);
});
