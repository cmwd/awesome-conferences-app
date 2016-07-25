const seneca = require('seneca')();
const sedneca = require('seneca');
const express = require('express');
const Router = require('./router');
const Database = require('./database');
const info = require('debug')('api:info:server');
const { process } = require('global');

const APP_PORT = process.env.NODE_PORT;
const app = express();
Router(app);
Database();

app.listen(APP_PORT, () => {
  info(`App listening on port ${APP_PORT}`);
});
