const express = require('express');
const router = require('./router');
const info = require('debug')('collectors:info:server');
require('./database');

const app = express();
const { NODE_PORT } = process.env;

router(app);
app.listen(NODE_PORT, () => {
  info(`App listening on port ${NODE_PORT}`);
});
