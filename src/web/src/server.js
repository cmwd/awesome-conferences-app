const express = require('express');
const Router = require('./server/router');
const Database = require('./server/services/database');
const info = require('debug')('app:info:server');
const { process } = require('global');

const APP_PORT = process.env.NODE_PORT;
const app = express();
Router(app);
Database();

app.listen(APP_PORT, () => {
  info(`App listening on port ${APP_PORT}`);
});
