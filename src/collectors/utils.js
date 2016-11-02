const createError = require('http-errors');
const utils = {
  handleFetchError(response) {
    if (response.ok) {
      return response.json();
    }

    throw createError(response.status, response.statusText);
  },
};

module.exports = utils;
