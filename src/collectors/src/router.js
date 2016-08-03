const { resourceController } = require('./controller/index');

const E_NOT_SUPPORTED = 'Method is not supported';

function notSupported(req, res, next) {
  next(new Error(E_NOT_SUPPORTED));
}

function router(app) {
  app
    .route('/resource/:resourceName/:resourceMethod')
    .get(resourceController.get)
    .all(notSupported);
}

module.exports = router;
