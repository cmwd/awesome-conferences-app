const co = require('co-express');
const { Router } = require('express');
const { videoModel } = require('../model/index');

function *index({ params }, res) {
  const { conferenceId } = params;
  const videos = yield videoModel.find({ conferenceId });

  res.json({ videos });
}

module.exports =
  Router()
    .get('/:conferenceId', co(index));
