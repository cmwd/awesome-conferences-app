const fetch = require('node-fetch');
const markdownParser = require('../parser/markdown-document');
const info = require('debug')('app:info:data-source');
const error = require('debug')('app:error:data-source');

/* eslint-disable max-len */
const AWESOME_LIST_URL = 'https://raw.githubusercontent.com/RichardLitt/awesome-conferences/master/README.md';
/* eslint-enable max-len */

function github() {
  info('Fetching document from Github.');

  return fetch(AWESOME_LIST_URL)
    .then(request => request.text())
    .catch(err => error(err))
    .then(markdownParser)
    .catch(err => error(err));
}

module.exports = { github };
