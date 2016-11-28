const co = require('co-express');
const httpError = require('http-errors');
const { VideoModel } = require('model');

function* getVideo(req, res, next, id) {
  req.video = yield VideoModel.findById(id);
  next(req.video
    ? null
    : httpError(404, 'Video does not exists'));
}

module.exports = co(getVideo);
