const mongoose = require('mongoose');

const { Schema } = mongoose;
const toUpperCase = str => str.toUpperCase();
const schema = mongoose.Schema({
  resourceId: { type: String, index: { unique: true, dropDups: true } },
  resourceName: { type: String, set: toUpperCase },
  conferenceId: { type: Schema.Types.ObjectId, ref: 'Conference' },
  data: Schema.Types.Mixed,
});
const videoModel = mongoose.model('Video', schema);

module.exports = videoModel;
