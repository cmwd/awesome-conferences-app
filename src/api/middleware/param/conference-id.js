const co = require('co-express');
const httpError = require('http-errors');
const { ConferenceModel } = require('model');

function* getConference(req, res, next, id) {
  req.conference = yield ConferenceModel.findById(id);
  next(req.conference
    ? null
    : httpError(404, 'Conference does not exists'));
}

module.exports = co(getConference);
