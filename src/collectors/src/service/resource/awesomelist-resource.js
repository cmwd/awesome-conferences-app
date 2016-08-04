const fetch = require('node-fetch');
const { resourceFactory } = require('./resource-factory');
const markdownParser = require('../../parser/markdown-parser');

/* eslint-disable max-len */
const AWESOME_LIST_URL = 'https://raw.githubusercontent.com/RichardLitt/awesome-conferences/master/README.md';
/* eslint-enable max-len */

const methods = {
  get() {
    return fetch(AWESOME_LIST_URL)
      .then(request => request.text())
      .then(markdownParser);
  },
};

module.exports = resourceFactory(methods);
