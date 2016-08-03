const resource = require('../service/resource');

function get({ query, params }, res, next) {
  const { resourceName, resourceMethod } = params;

  if (!resource[resourceName]) {
    next(new Error('Unknown resource'));
  } else {
    resource[resourceName]
      .execute(resourceMethod, query)
      .then(result => res.json(result))
      .catch(next);
  }
}

module.exports = { get };
