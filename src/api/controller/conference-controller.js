const _ = require('lodash');
const co = require('co-express');
const bodyParser = require('body-parser');
const { Router } = require('express');
const HTTPError = require('http-errors');
const { conferenceModel } = require('model');

const SUCCESS_STATUS = { ok: true };

const getLimit = req => parseInt(req.query.limit, 10) || 20;
const getOffset = req => parseInt(req.query.offset, 10) || 0;

function* attachConferenceToRequest(req, res, next, id) {
  req.conference = yield conferenceModel.find({ id });
  next(req.conference
    ? null
    : HTTPError(404, 'Conference does not exists'));
}

function* getConferences(req, res) {
  const limit = getLimit(req);
  const offset = getOffset(req);

  let conferencesFindQuery = null;

  if (req.query.id) {
    conferencesFindQuery = conferenceModel.findByIds(req.query.id.split(','));
  } else if (req.query.slug) {
    conferencesFindQuery = conferenceModel
      .findBySlugs(req.query.slug.split(','))
  } else {
    conferencesFindQuery = conferenceModel.find();
  }

  const [conferences, count] = yield Promise.all(
    [
      conferencesFindQuery.skip(offset).limit(limit),
      conferenceModel.count(),
    ]);
  const info = { limit, offset, count };

  res.json({ info, conferences, status: SUCCESS_STATUS });
}

function* saveConference(req, res) {
  yield conferenceModel.create(req.body);

  res.json({ status: SUCCESS_STATUS });
}

function* updateConference(req, res) {
  res.json();
}

module.exports =
  Router()
    .param('conferenceId', co(attachConferenceToRequest))
    .use(bodyParser.json())
    .get('/', co(getConferences))
    .post('/', co(saveConference))
    .put('/:conferenceId', co(updateConference));
