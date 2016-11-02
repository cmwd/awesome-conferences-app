const { Router } = require('express');
const bodyParser = require('body-parser');
const resource = require('../service/resource');

function index({ query, body, params }, res, next) {
  const resourceName = params.resourceName.toLowerCase();

  if (!resource[resourceName]) {
    next(new Error('Unknown resource'));
  } else {
    resource[resourceName](Object.assign({}, { params, query, body }))
      .then(result => res.json(result))
      .catch(next);
  }
}

module.exports =
  Router()
    .use(bodyParser.json())
    .post('/:resourceName', index)
    .get('/:resourceName', index);
