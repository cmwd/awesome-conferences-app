const httpError = require('http-errors');
const bodyParser = require('body-parser');
const { Router: router } = require('express');
const authentication = require('middleware/authentication');
const response = require('util/response');

const {
  conferenceController,
  resourceController,
  videoController,
  authenticateController,
} = require('./controller/index');

function routerCreator(app, route, controller) {
    const proto = { httpError, bodyParser, router, authentication, response };

    app.use(route, controller(proto));
}

module.exports = (app) => {
    routerCreator(app, '/conference/', conferenceController);

  app
    .use('/video', videoController)
    .use('/authenticate', authenticateController)
    .get('*', (req, res, next) => next(httpError.NotFound()));
};
