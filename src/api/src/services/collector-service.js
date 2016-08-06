const url = require('url');
const _ = require('lodash');
const fetch = require('node-fetch');
const { conferenceModel, resourceModel } = require('../model/index');

const C_URL = process.env.COLLECTORS_ADDRESS;
const FETCH_SETTINGS = {
  timeout: 10000,
};

const composeUrl = ({ pathname, query }) =>
  url.format({ host: C_URL, pathname, query });

const createRequest = requestUrl =>
  fetch(requestUrl, FETCH_SETTINGS)
    .then(response => response.json());

function getTwitterData() {
  return new Promise((resolve, reject) => {
    const pathname = '/resource/twitter/lookup';
    resourceModel
      .find({ resourceName: 'TWITTER' })
      .then(resources => {
        const requests = _.chunk(resources
          .map(({ userId }) => userId), 99)
          .map(users => createRequest(
            composeUrl({ pathname, query: { screenName: users } })));

        return Promise.all(requests);
      })
      .then(resolve)
      .catch(reject);
  });
}

function getAwesomeList() {
  const pathname = '/resource/awesomelist/get';

  return createRequest(composeUrl({ pathname }))
    .then(data => conferenceModel.insertFromAWSL(data));
}

module.exports = { getAwesomeList, getTwitterData };
