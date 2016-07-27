const { routerParams, PARAM } = require('./router-params');
const { conferencesController, resourcesController } = require('./controller/index');

const E_NOT_SUPPORTED = 'Method is not supported';

function notSupported(message = E_NOT_SUPPORTED) {
  return (req, res, next) => next(new Error(message));
}

function notFound(req, res, next) {
  res.status(404).json({
    status: 404,
    statusMessage: `Not found: ${req.url}`
  });
}

function router(app) {
  routerParams(app);

  app.route('/conferences/')
    .get(conferencesController.show)
    .put(notSupported())
    .post(notSupported())
    .delete(notSupported());

  app.route('/resources/:conference_id')
    .get(resourcesController.show);

  app.use(notFound);
}

module.exports = router;
