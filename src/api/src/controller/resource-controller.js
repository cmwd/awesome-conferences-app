const co = require('co-express');
const { Router } = require('express');
const HTTPError = require('http-errors');
const { resourceModel, conferenceModel } = require('../model/index');
const youtube = require('../service/youtube');

function *index({ params, query }, res) {
  const { conferenceId } = params;
  const { resourceName } = query;
  const items = yield resourceModel
    .findByParent({ conferenceId, resourceName });

  res.json(items);
}

function *add({ params, query }, res, next) {
  const { conferenceId, resourceName: rN } = params;
  const resourceName = rN.toUpperCase();
  const resourceInfo = query;
  const conference = yield conferenceModel.findOne({ _id: conferenceId });

  if (conference) {
    const data = yield youtube.getVideos(query);
    const result = yield resourceModel.update(
      { conferenceId, resourceName },
      { $set: { conferenceId, resourceName, resourceInfo, data } },
      { upsert: true });

    yield conferenceModel.updateDetails([conference]);
    res.json({ result });
  } else {
    next(HTTPError.Conflict('Resource not found'));
  }
}

module.exports =
  Router()
    .get('/:conferenceId', co(index))
    .put('/:conferenceId/:resourceName', co(add));
