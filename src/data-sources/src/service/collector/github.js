const fetch = require('node-fetch');
const markdownParser = require('../../parser/markdown-parser');
const info = require('debug')('data-sources:info:collector:github');
const error = require('debug')('data-sources:error:collector:github');

/* eslint-disable max-len */
const AWESOME_LIST_URL = 'https://raw.githubusercontent.com/RichardLitt/awesome-conferences/master/README.md';
/* eslint-enable max-len */

function awesomeList() {
  info('collector job start');

  return fetch(AWESOME_LIST_URL)
    .then(request => request.text())
    .catch(err => error(err))
    .then(markdownParser)
    .catch(err => error(err));
}

module.exports = { awesomeList };
