const mongoose = require('mongoose');
const { resourceModel } = require('./resource-model');

const { Schema } = mongoose;
const schema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  url: { type: String, index: { unique: true, dropDups: true } },
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
});

function createTwitterResources(conferences) {
  const resourceName = 'twitter';
  const resources = conferences.map(({ twitterId: userId }) =>
    ({ resourceName, userId }));

  return resourceModel.insertMany(resources);
}

function createAwesomeListResources(conferences) {
  const resourceName = 'awesomelist';
  const resources = conferences.map(data => ({ resourceName, data }));

  return resourceModel.insertMany(resources);
}

function insertFromAWSL(conferences) {
  const model = this;

  return Promise
    .all([
      createTwitterResources(conferences),
      createAwesomeListResources(conferences),
    ])
    .then(([twitter, awesomeList]) => awesomeList
      .map((resource, index) => ({
        name: resource.data.name,
        url: resource.data.url,
        resources: [twitter[index], resource],
      })))
    .then(data => model.insertMany(data));
}

schema.static('insertFromAWSL', insertFromAWSL);
const conferenceModel = mongoose.model('Conference', schema);

module.exports = { conferenceModel };
