const { conferenceModel } = require('../model/index');

function getConferences(req, res, next) {
  conferenceModel.find()
    .then(data => res.json(data))
    .catch(next);
}

module.exports = { getConferences };
