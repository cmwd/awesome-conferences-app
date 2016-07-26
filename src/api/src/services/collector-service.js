const _ = require('lodash');
const fetch = require('node-fetch');
const { TwitterAccountModel, ConferenceModel } = require('../model/index');

const P_TIMEOUT = 5000;
const C_URL = 'http://localhost:8001/collector/awesomeList';

function storeEntry(result, entry) {
  const twitterAccount = new TwitterAccountModel(entry.twitterAccount);
  const conferenceData = _.assign({}, entry, { twitterAccount });
  const conferenceModel = new ConferenceModel(conferenceData);

  result.push(conferenceModel.save(), twitterAccount.save());
  return result;
};

function getList() {
  return fetch(C_URL, { timeout: P_TIMEOUT })
    .then(response => response.json())
    .then(conferences => Promise.all( conferences.reduce(storeEntry, []) ))
    .then(ConferenceModel.find({}));
}

module.exports = { getList };
