const { Promise, process } = require('global');
const mongoose = require('mongoose');
const pino = require('pino')({ name: 'database' });
const DB_NAME = 'acl';
const DB_ADDRESS = `${process.env.NODE_DB_ADDRESS}/${DB_NAME}`;

pino.info(`Connecting to mongo at ${DB_ADDRESS}`);
mongoose.Promise = Promise;
mongoose.connection.on('connected', () =>
  pino.info('Connected'));
mongoose.connection.on('disconnected', () =>
  pino.warn('Disconnected'));
mongoose.connection.on('error', err =>
  pino.error(err));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    pino.warn('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = () => mongoose.connect(DB_ADDRESS);
