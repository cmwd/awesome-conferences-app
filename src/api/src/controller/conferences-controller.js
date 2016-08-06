const { conferenceModel } = require('../model/index');
const {
  getAwesomeList,
  getTwitterData,
} = require('../services/collector-service');

function show({ query }, res, next) {
  let getDataProcess;
  const { forceRefresh } = query;

  if (forceRefresh) {
    getDataProcess = getAwesomeList();
  } else {
    getDataProcess = conferenceModel.find();
  }

  getDataProcess
    .then(data => res.json(data))
    .catch(next);
}

module.exports = { show };
