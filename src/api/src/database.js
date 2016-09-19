const { Promise, process } = require('global');
const mongoose = require('mongoose');
const pino = require('pino')({ name: 'database' });
const { DB_NAME, DB_URL } = require('../config');
const ADDRESS = `${DB_URL}/${DB_NAME}`;

mongoose.Promise = Promise;

function database({ onConnect, onError }) {
  pino.info(`Connecting to mongo at ${ADDRESS}`);

  mongoose.connection.on('connected', () => {
    pino.info('Connected');
    onConnect();
  });

  mongoose.connection.on('disconnected', () => {
    pino.warn('Disconnected');
  });

  mongoose.connection.on('error', err => {
    pino.error(err);
    onError(err);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      pino.warn('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });

  mongoose.connect(ADDRESS);
}

module.exports = database;
