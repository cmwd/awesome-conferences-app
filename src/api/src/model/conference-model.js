const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = Schema({
  name: String,
  url: String,
  region: String,
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  twitterAccount: { type: Schema.Types.ObjectId, ref: 'TwitterAccount' },
});
const ConferenceModel = mongoose.model('Conference', schema);

module.exports = { ConferenceModel };
