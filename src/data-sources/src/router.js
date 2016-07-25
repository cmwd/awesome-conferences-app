const collectorController = require('./controller/collector-controller');

function router(app) {
  app.get('/collector/awesomeList', collectorController.awesomeList);
}

module.exports = router;
