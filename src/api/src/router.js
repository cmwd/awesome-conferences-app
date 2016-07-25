const { conferencesController } = require('./controller/index');

function Router(app) {
  app
    .get('/conferences/', conferencesController.index);
}

module.exports = Router;
