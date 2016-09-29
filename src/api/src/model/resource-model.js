const mongoose = require('mongoose');

const YOUTUBE = 'YOUTUBE';
const TWITTER = 'TWITTER';
const AWESOMELIST = 'AWESOMELIST';

const toUpperCase = str => str.toUpperCase();

const { Schema } = mongoose;
const resources = [YOUTUBE, TWITTER, AWESOMELIST];
const schema = mongoose.Schema({
  resourceName: { type: String, enum: resources, set: toUpperCase },
  conferenceId: { type: Schema.Types.ObjectId, ref: 'Conference' },
  resourceInfo: Schema.Types.Mixed,
  data: Schema.Types.Mixed,
});

const statics = {
  findByParent({ conferenceId, resourceName }) {
    const query = { conferenceId };

    if (resourceName) {
      Object.assign(query, { resourceName: resourceName.toUpperCase() });
    }

    return this.find(query);
  },
};

Object.assign(schema.statics, statics);
const resourceModel = mongoose.model('Resource', schema);

module.exports = resourceModel;
module.exports.TYPE = { YOUTUBE, TWITTER, AWESOMELIST };
