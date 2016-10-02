const HTTPError = require('http-errors');
const {
  conferenceController,
  resourceController,
  videoController,
  userController,
  authenticateController,
} = require('./controller/index');

module.exports = (app) => {
  app
    .use('/conference', conferenceController)
    .use('/resource', resourceController)
    .use('/video', videoController)
    .use('/user', userController)
    .use('/authenticate', authenticateController)
    .get('*', (req, res, next) => next(HTTPError.NotFound()));
};
