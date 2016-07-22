const { dataController } = require('./controller/index');

function Router(app) {
  app.get('/data/github', dataController.github);
}

module.exports = Router;
