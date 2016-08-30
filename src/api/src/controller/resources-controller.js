const co = require('co');
const { conferenceModel, resourceModel } = require('../model/index');

function showResources({ params }, res, next) {
  conferenceModel
    .findById(params.conferenceId)
    .populate('resources')
    .then(model => res.json(model))
    .catch(next);
}

function addResource({ params, query }, res, next) {
  const { resourceName, userName } = query;

  co(function *() {
    const resource = yield resourceModel.create({ resourceName, userName });
    yield conferenceModel
      .update(params.conferenceId, { $addToSet: { resources: resource } });

    res.json(resource);
  }).catch(next);
}

module.exports = { showResources, addResource };
