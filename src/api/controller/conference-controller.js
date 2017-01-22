const { Router } = require('express');
const co = require('co-express');
const ConferenceModel = require('../model/conference-model');

function* index(req, res) {
  const items = yield ConferenceModel.find();
  res.json({ items });
}

function* getItem({ params }, res) {
  const conference = yield ConferenceModel.findOne(params);
  res.json(conference);
}

module.exports = Router()
  .get('/', co(index))
  .get('/:filePath', co(getItem));

