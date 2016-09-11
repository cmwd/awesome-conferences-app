const {
  conferenceController,
  resourceController,
} = require('./controller/index');

module.exports = app => {
  app
    .use('/conference', conferenceController)
    .use('/resource', resourceController);
};
