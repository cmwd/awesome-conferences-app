const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { COLLECTORS_ADDRESS } = process.env;

module.exports = ({ resourceName, query }) => {
  const url =
    [COLLECTORS_ADDRESS, 'resource', resourceName].join('/');

  return fetch(`${url}?${stringify(query)}`)
    .then(response => response.json());
};
