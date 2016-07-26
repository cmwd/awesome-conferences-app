const collectorController = require('./controller/collector-controller');

const E_NOT_SUPPORTED = 'Method is not supported';

function notSupported(req, res, next) {
  next(new Error(E_NOT_SUPPORTED));
}


function router(app) {
  app
    .route('/collector/awesomeList/')
    .get(collectorController.awesomeList)
    .put(notSupported)
    .post(notSupported)
    .delete(notSupported);
}

module.exports = router;
