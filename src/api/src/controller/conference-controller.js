const co = require('co-express');
const { Router } = require('express');
const HTTPError = require('http-errors');
const paginator = require('../utils/paginator');
const { conferenceModel } = require('../model/index');

function *index(req, res) {
  const {
    limit = 20,
    offset = 0,
  } = req.query;
  const [conferences, count] = yield Promise.all(
    [
      conferenceModel
        .find().skip(parseInt(offset, 10)).limit(parseInt(limit, 10)),
      conferenceModel.count(),
    ]);
  const pages = paginator.generate(count, offset, limit);

  res.json({ pages, conferences });
}

function *conference(req, res) {
  const { conferenceId } = req.params;
  const model = yield conferenceModel.findOne({ _id: conferenceId });

  if (!model) {
    throw HTTPError.NotFound('Conference not found');
  }

  res.json(model);
}

module.exports =
  Router()
    .get('/', co(index))
    .get('/:conferenceId', co(conference));
