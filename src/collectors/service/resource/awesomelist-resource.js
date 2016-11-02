const fetch = require('node-fetch');
const markdownParser = require('../../parser/markdown-parser');

/* eslint-disable max-len */
const AWESOME_LIST_URL = 'https://raw.githubusercontent.com/RichardLitt/awesome-conferences/master/README.md';
/* eslint-enable max-len */

const handler = () =>
  fetch(AWESOME_LIST_URL)
    .then(request => request.text())
    .then(markdownParser);

module.exports = handler;
