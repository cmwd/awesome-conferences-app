const co = require('co');
const { Router } = require('express');
const paginator = require('../utils/paginator');
const { conferenceModel } = require('../model/index');

function *getConferencesList(offset, limit) {
  const conferences = yield conferenceModel
    .find()
    .skip(parseInt(offset, 10))
    .limit(parseInt(limit, 10));
  const count = yield conferenceModel.count();
  const pages = paginator.generate(count, offset, limit);

  return { pages, conferences };
}

function index(req, res, next) {
  const {
    limit = 20,
    offset = 0,
  } = req.query;

  co(getConferencesList(offset, limit))
    .then(data => res.json(data))
    .catch(next);
}

function conference(req, res, next) {
  const { conferenceId } = req.params;
  const { resources } = req.query;
  const query = conferenceModel.findById(conferenceId);

  if (Boolean(resources)) {
    query.populate('resources');
  }

  query
    .then(data => res.json(data))
    .catch(next);
}

module.exports =
  Router()
    .get('/', index)
    .get('/:conferenceId', conference);
