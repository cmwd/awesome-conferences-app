const { routerParams } = require('./router-params');
const {
  conferencesController,
  resourcesController,
} = require('./controller/index');

const H_E_NOT_ALLOWED = 405;
const H_E_NOT_FOUND = 404;
const M_NOT_SUPPORTED = 'Method is not supported.';

function errorHandler({ code, message = M_NOT_SUPPORTED }) {
  return ({ url }, res) => {
    res
      .status(code)
      .json({ code, message, url });
  };
}

function router(app) {
  routerParams(app);

  app.route('/conferences/')
    .get(conferencesController.show)
    .put(errorHandler({ code: H_E_NOT_ALLOWED }))
    .post(errorHandler({ code: H_E_NOT_ALLOWED }))
    .delete(errorHandler({ code: H_E_NOT_ALLOWED }));

  app.route('/resources/:conference_id')
    .get(resourcesController.show)
    .put(resourcesController.add);

  app.use(errorHandler({ code: H_E_NOT_FOUND, message: 'Not found.' }));
}

module.exports = router;
