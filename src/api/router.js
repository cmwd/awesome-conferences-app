const httpError = require('http-errors');
const bodyParser = require('body-parser');
const { Router } = require('express');
const authentication = require('middleware/authentication');
const errorHandler = require('middleware/error-to-json-response');
const response = require('util/response');
const param = require('middleware/param');

const {
  conferenceController,
  resourceController,
  videoController,
  authenticateController,
} = require('./controller/index');

function routerCreator(app, route, controller) {
    const proto = { app: Router(), authentication, response, param };

    app.use(route, controller(proto));
}

module.exports = (app) => {
    routerCreator(app, '/conference/', conferenceController);
    routerCreator(app, '/video/', videoController);

  app
    .use('/authenticate', authenticateController)
    .get('*', (req, res, next) => next(httpError.NotFound()))
    .use(errorHandler);
};
