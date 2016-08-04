const fetch = require('node-fetch');
const { conferenceModel } = require('../model/index');

const P_TIMEOUT = 10000;
const C_URL = `${process.env.COLLECTORS_ADDRESS}/resource/awesomelist/get`;

function getList() {
  return fetch(C_URL, { timeout: P_TIMEOUT })
    .then(response => response.json())
    .then(data => conferenceModel.insertFromAWSL(data));
}

module.exports = { getList };
