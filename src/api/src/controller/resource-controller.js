const co = require('co-express');
const { Router } = require('express');
const HTTPError = require('http-errors');
const { resourceModel, conferenceModel } = require('../model/index');
const youtube = require('../service/youtube');
const { tokenSecured, isAdmin } = require('../service/authentication');

function *index({ params, query }, res) {
  const { slug } = params;
  const { resourceName } = query;
  const { _id: conferenceId } = yield conferenceModel.findOne({ slug });
  const items = yield resourceModel
    .findByParent({ conferenceId, resourceName });
  const resultJson = items.reduce((result, resource) =>
    Object.assign({}, result, {
      [resource.resourceName.toLowerCase()]: resource }), {});

  res.json(resultJson);
}

function *add({ params, query }, res, next) {
  /**
   * @todo move resourceName to query
   */
  const { slug, resourceName: rN } = params;
  const resourceName = rN.toUpperCase();
  const resourceInfo = query;
  const conference = yield conferenceModel.findOne({ slug });
  const conferenceId = conference._id;

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
    .get('/:slug', co(index))
    .put('/:slug/:resourceName', tokenSecured, isAdmin, co(add));
