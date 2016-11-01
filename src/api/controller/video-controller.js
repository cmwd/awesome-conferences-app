const _ = require('lodash');
const co = require('co-express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const { BadRequest } = require('http-errors');
const { videoModel, conferenceModel } = require('model');
const errorHandler = require('middleware/error-to-json-response');
const { tokenSecured, isAdmin } = require('middleware/authentication');
const collectors = require('service/collectors');

const SUCCESS_STATUS = { ok: true };

/**
 * @todo Find better solution for this check
 */
function* checkIfConferenceExists({ params }, res, next) {
  const conference = yield conferenceModel.findById(params.conferenceId);

  if (!conference) {
    throw new BadRequest('Unknown conference');
  }

  next(null);
}

function* getVideos(req, res) {
  const videos = yield videoModel.find();

  res.json({ videos, status: SUCCESS_STATUS });
}

function* getVideosByConferenceId({ params }, res) {
  const { conferenceId } = params;
  const videos = yield videoModel.find({ conferenceId });

  res.json({ videos, status: SUCCESS_STATUS });
}

function* setConferenceVideos({ params, body, log }, res) {
  const { conferenceId } = params;
  const { resourceName, videoIds } = body;

  if (!resourceName || !videoIds || !videoIds.every(_.isString)) {
    throw new BadRequest('Incorrect input data');
  }

  const videos = yield collectors.getVideoDetails({ resourceName, videoIds });
  yield videoModel.setVideos(resourceName, conferenceId, videos);
  res.json({ status: SUCCESS_STATUS });
}

module.exports = Router()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('/', co(getVideos))
  .get('/:conferenceId',
    co(checkIfConferenceExists),
    co(getVideosByConferenceId)
    )
  .put('/:conferenceId',
    tokenSecured,
    isAdmin,
    co(checkIfConferenceExists),
    co(setConferenceVideos))
  .use(errorHandler);
