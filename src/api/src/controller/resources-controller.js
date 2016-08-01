const _ = require('lodash');
const { ConferenceModel, ResourceModel } = require('../model/index');

function show({ pocket }, res) {
  const conferenceModel = pocket.get('conferenceModel');

  conferenceModel
    .populate('resources', (err, doc) => {
      res.json(conferenceModel.resources);
    });
}

function add({ pocket, query }, res, next) {
  const conferenceModel = pocket.get('conferenceModel');
  const { resourceName } = query;
  const data = _.assign({}, query, {
    resourceName: resourceName.toUpperCase() });

  conferenceModel.populate('resources', () => {
    const resource = conferenceModel.resources
      .find(({ resourceName: rName }) => rName === resourceName);

    if (resource) {
      resource
        .update(data, data)
        .then(() => { res.json(resource); })
        .catch(next);
    } else {
      conferenceModel.resources.push(data);
      conferenceModel
        .save()
        .then(() => ResourceModel.findOne(data))
        .then(resourceModel => res.json(resourceModel))
        .catch(next);
    }
  });
}

module.exports = { show, add };
