const _ = require('lodash');
const co = require('co-express');
const bodyParser = require('body-parser');
const HTTPError = require('http-errors');
const { VideoModel } = require('model');
const { tokenSecured, isAdmin } = require('middleware/authentication');
const collectors = require('service/collectors');

function VideoController({ authentication, app, response, param }) {
  const { tokenSecured, isAdmin } = authentication;
  const authenticationCheck = [tokenSecured, isAdmin];

  function* getVideos(req, res) {
    const videos = yield VideoModel.find();

    response(res, { videos });
  }

  function* getVideosByConferenceId({ params }, res) {
    const { conferenceId } = params;
    const videos = yield VideoModel.find({ conferenceId });

    response(res, { videos });
  }

  function* createVideoModel({ params, body, query }, res) {
    const video = VideoModel.create(body);

    yield video.getVideoDetails();

    response(res);
  }

  function* removeVideoModel({ video }, res) {
    yield video.remove();
    response(res);
  }

  return app
    .param('videoId', param.videoId)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .get('/', co(getVideos))
    .get('/:conferenceId', co(getVideosByConferenceId))
    .post('/', authenticationCheck, co(createVideoModel))
    .delete('/:videoId', authenticationCheck, co(removeVideoModel))
}

module.exports = VideoController;
