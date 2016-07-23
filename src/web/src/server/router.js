const { homeController } = require('./controller/index');

function Router(app) {
  app
    .get('/', homeController.index);
}

module.exports = Router;
