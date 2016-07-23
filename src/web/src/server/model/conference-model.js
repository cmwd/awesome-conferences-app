const mongoose = require('mongoose');

const ConferenceSchema = mongoose.Schema({
  name: String,
  url: String,
  twitter: String,
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
  },
});

module.exports = mongoose.model('Conference', ConferenceSchema);
