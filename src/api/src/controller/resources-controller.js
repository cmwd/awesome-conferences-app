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

  resourceModel
    .create({ resourceName, userName })
    .then(model =>
      conferenceModel
        .update(params.conferenceId, { $addToSet: { resources: model } }))
    .then(model => res.json(model))
    .catch(next);
}

module.exports = { showResources, addResource };
