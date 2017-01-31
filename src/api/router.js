const HTTPError = require('http-errors');
const ConferenceController = require('./controller/conference-controller');
const GithubIntegrationController =
  require('./controller/github-integration-controller');

module.exports = (app) => {
  app
    .use('/github', GithubIntegrationController)
    .use('/conference', ConferenceController)
    .get('*', (req, res, next) => next(HTTPError.NotFound()));
};
