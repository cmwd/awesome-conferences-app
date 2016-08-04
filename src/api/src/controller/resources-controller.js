const { ConferenceModel, ResourceModel } = require('../model/index');

function show({ params }, res, next) {
  ConferenceModel
    .findOne(params.conference_id)
    .populate('resources')
    .then(model => res.json(model))
    .catch(next);
}

function add({ params, query }, res, next) {
  const { resourceName, userName } = query;

  ResourceModel
    .create({ resourceName, userName })
    .then(model =>
      ConferenceModel
        .update(params.conference_id, { $addToSet: { resources: model } }))
    .then(model => res.json(model))
    .catch(next);
}

module.exports = { show, add };
