const conferenceController = require('./conference-controller');
const resourceController = require('./resource-controller');
const videoController = require('./video-controller');
const userController = require('./user-controller');
const authenticateController = require('./authenticate-controller');

module.exports = {
  conferenceController,
  resourceController,
  videoController,
  userController,
  authenticateController,
};
