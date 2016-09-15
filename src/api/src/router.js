const HTTPError = require('http-errors');
const { conferenceController } = require('./controller/index');

module.exports = app => {
  app
    .use('/conference', conferenceController)
    .get('*', (req, res, next) => next(HTTPError.NotFound()));
};
