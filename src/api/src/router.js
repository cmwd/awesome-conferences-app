const HTTPError = require('http-errors');
const {
  conferenceController,
  resourceController,
  videoController,
} = require('./controller/index');

module.exports = (app) => {
  app
    .use('/conference', conferenceController)
    .use('/resource', resourceController)
    .use('/video', videoController)
    .get('*', (req, res, next) => next(HTTPError.NotFound()));
};
