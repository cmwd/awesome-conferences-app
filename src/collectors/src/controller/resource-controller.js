const { Router } = require('express');
const resource = require('../service/resource');

function index({ query, params }, res, next) {
  const { resourceName } = params;

  if (!resource[resourceName]) {
    next(new Error('Unknown resource'));
  } else {
    resource[resourceName](Object.assign({}, { params, query }))
      .then(result => res.json(result))
      .catch(next);
  }
}

module.exports =
  Router()
    .get('/:resourceName', index);
