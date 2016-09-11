const { Router } = require('express');
const co = require('co');
const { conferenceModel, resourceModel } = require('../model/index');
const Resource = require('../service/resource-service');

function index({ params }, res, next) {
  conferenceModel
    .findById(params.conferenceId)
    .populate('resources')
    .then(model => res.json(model))
    .catch(next);
}

function *addResource({ params, query }, res, next) {
  const { conferenceId, resourceName } = params;

  const resource = conferenceModel.findOne({
    _id: conferenceId,
    'resources.name': resourceName.toUpperCase(),
  }).then(console.log.bind(console));

  console.log(resource);

  Resource(Object.assign({}, params, { query }))
    .then(data => res.json(data))
    .catch(next);
}

module.exports =
  Router()
    .get('/:conferenceId', index)
    .post('/:conferenceId/:resourceName', co.wrap(addResource));

