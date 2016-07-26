const _ = require('lodash');
const { ConferenceModel } = require('../model/index');
const collectorService = require('../services/collector-service');

const conferencesController = {
  index(req, res, next) {
    ConferenceModel
      .find({})
      .then(d => !_.isEmpty(d) ? d : collectorService.getList() )
      .then(data => res.json(data))
      .catch(next);
  },
};

module.exports = conferencesController;
