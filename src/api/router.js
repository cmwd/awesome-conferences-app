const HTTPError = require('http-errors');
const {
  userController,
  authenticateController,
  githubIntegrationController,
  conferenceController,
} = require('./controller/index');

module.exports = (app) => {
  app
    .use('/user', userController)
    .use('/authenticate', authenticateController)
    .use('/github', githubIntegrationController)
    .use('/conference', conferenceController)
    .get('*', (req, res, next) => next(HTTPError.NotFound()));
};
