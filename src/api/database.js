const { Promise, process } = require('global');
const mongoose = require('mongoose');
const { DB_NAME, DB_ADDRESS } = require('config');

const ADDRESS = `${DB_ADDRESS}/${DB_NAME}`;

mongoose.Promise = Promise;

function database({ onConnect, onError, logger }) {
  logger.info(`Connecting to mongo at ${ADDRESS}`);

  mongoose.connection.on('connected', () => {
    logger.info('Connected');
    onConnect();
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('Disconnected');
  });

  mongoose.connection.on('error', err => {
    logger.error(err);
    onError(err);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });

  mongoose.connect(ADDRESS);
}

module.exports = database;
