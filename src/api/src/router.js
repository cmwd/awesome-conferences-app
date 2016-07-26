const { conferencesController } = require('./controller/index');

const E_NOT_SUPPORTED = 'Method is not supported';

function notSupported(req, res, next) {
  next(new Error(E_NOT_SUPPORTED));
}

function Router(app) {
  app.route('/conferences/')
    .get(conferencesController.index)
    .put(notSupported)
    .post(notSupported)
    .delete(notSupported);
}

module.exports = Router;