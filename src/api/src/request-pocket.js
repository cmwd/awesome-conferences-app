/* eslint-disable no-param-reassign */

function requestPocket(req, res, next) {
  req.pocket = new Map();
  next();
}

module.exports = { requestPocket };
