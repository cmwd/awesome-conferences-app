require('./database');
const express = require('express');
const info = require('debug')('data-sources:info:server');
const router = require('./router');
const { process } = require('global');

const APP_PORT = process.env.NODE_PORT;
const app = express();

router(app);

app.listen(APP_PORT, () => {
  info(`App listening on port ${APP_PORT}`);
});
