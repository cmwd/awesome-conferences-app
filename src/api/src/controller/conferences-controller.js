const _ = require('lodash');
const { conferenceModel } = require('../model/index');
const collectorService = require('../services/collector-service');

function show(req, res, next) {
  conferenceModel
    .find({})
    .populate('resources')
    .then(models => !_.isEmpty(models) ? models : collectorService.getList())
    .then(data => res.json(data))
    .catch(next);
}

module.exports = { show };
