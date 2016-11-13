const co = require('co-express');
const { Router } = require('express');
const HTTPError = require('http-errors');
const { conferenceModel } = require('model');

const SUCCESS_STATUS = { ok: true };

function *index(req, res) {
  const { limit: lm = 20, offset: ofs = 0 } = req.query;
  const limit = parseInt(lm, 10);
  const offset = parseInt(ofs, 10);
  const [conferences, count] = yield Promise.all(
    [
      conferenceModel.find().skip(offset).limit(limit),
      conferenceModel.count(),
    ]);
  const info = { limit, offset, count };

  res.json({ info, conferences, status: SUCCESS_STATUS });
}

function *getConferenceBySlug(req, res, next) {
  const { slug } = req.params;
  const conference = yield conferenceModel.findOne({ slug });

  if (!conference) {
    next(HTTPError.NotFound('Conference not found'));
  } else {
    res.json({ conference, status: SUCCESS_STATUS });
  }
}

module.exports =
  Router()
    .get('/', co(index))
    .get('/:slug', co(getConferenceBySlug));
