const mongoose = require('mongoose');

const { Schema } = mongoose;
const ConferenceSchema = Schema({
  name: String,
  url: String,
  region: String,
  twitterAccount: { type: Schema.Types.ObjectId, ref: 'twitterAccount' },
});

module.exports = mongoose.model('Conference', ConferenceSchema);
