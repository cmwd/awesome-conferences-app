const { resourceController } = require('./controller/index');

module.exports = app => {
  app.use('/resource', resourceController);
};
