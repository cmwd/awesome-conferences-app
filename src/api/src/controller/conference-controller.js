const co = require('co-express');
const { Router } = require('express');
const HTTPError = require('http-errors');
const paginator = require('../utils/paginator');
const { conferenceModel } = require('../model/index');

function *index(req, res) {
  const { limit: lm = 20, offset: ofs = 0 } = req.query;
  const limit = parseInt(lm, 10);
  const offset = parseInt(ofs, 10);
  const [conferences, count] = yield Promise.all(
    [
      conferenceModel.find().skip(offset).limit(limit),
      conferenceModel.count(),
    ]);
  const pages = paginator.generate(count, offset, limit);

  res.json({ pages, conferences });
}

function *conference(req, res, next) {
  const { slug } = req.params;
  const model = yield conferenceModel.findOne({ slug });

  if (!model) {
    next(HTTPError.NotFound('Conference not found'));
  } else {
    res.json(model);
  }
}

module.exports =
  Router()
    .get('/', co(index))
    .get('/:slug', co(conference));
