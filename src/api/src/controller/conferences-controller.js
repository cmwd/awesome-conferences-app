const _ = require('lodash');
const { ConferenceModel } = require('../model/index');
const error = err => { throw new Error(err); };

const grabNewData = () => new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, { greetings: 'from new data' });
});

const validateModels = (req, res) =>
  models => {
    return !_.isEmpty(models) ? models : grabNewData().catch(error);
  };

const conferencesController = {
  index(req, res) {
    ConferenceModel
      .find({})
      .catch(err => res.status(500).json(err))
      .then(validateModels(req, res))
      .catch(err => res.status(500).json(err))
      .then(data => res.json(data));
  },
};

module.exports = conferencesController;
