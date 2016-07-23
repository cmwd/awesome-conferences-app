const mongoose = require('mongoose');

const ConferenceSchema = mongoose.Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  url: { type: String, index: { unique: true, dropDups: true } },
  twitterScreenName: { type: String, index: { unique: false, dropDups: true } },
  description: String,
  profileBannerUrl: String,
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  region: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }],
});

module.exports = mongoose.model('Conference', ConferenceSchema);
