const mongoose = require('mongoose');

const ConferenceSchema = mongoose.Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  url: { type: String, index: { unique: true, dropDups: true } },
  twitter_screen_name:
    { type: String, index: { unique: false, dropDups: true } },
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  region: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }],
});

module.exports = mongoose.model('Conference', ConferenceSchema);
