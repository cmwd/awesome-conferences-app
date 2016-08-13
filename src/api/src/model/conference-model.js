const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  url: { type: String, index: { unique: true, dropDups: true } },
  description: String,
  region: String,
  location: String,
  banner: String,
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
});

const conferenceModel = mongoose.model('Conference', schema);

module.exports = { conferenceModel };
