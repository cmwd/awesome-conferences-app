const co = require('co');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const toUpperCase = str => str.toUpperCase();
const schema = mongoose.Schema({
  resourceId: { type: String, index: { unique: true, dropDups: true } },
  resourceName: { type: String, set: toUpperCase },
  conferenceId: { type: Schema.Types.ObjectId, ref: 'Conference' },
  data: Schema.Types.Mixed,
}, { timestamps: true });

schema.statics.setVideos = function setVideos(
  resourceName = () => { throw new TypeError('resourceName is requred'); },
  conferenceId = () => { throw new TypeError('conferenceId is requred'); },
  videos = []
) {
  if (!Array.isArray(videos)) throw new TypeError('videos must be an array');

  const updateQuery = data => this.update(
    { conferenceId, resourceName, resourceId: data.videoId },
    { $set: { conferenceId, resourceName, resourceId: data.videoId, data } },
    { upsert: true });

  const removeQuery = videoIds => this.remove(
    { conferenceId, resourceName, resourceId: { $nin: videoIds } });

  return co(function* setVideosQueries() {
    yield Promise.all(videos.map(data => updateQuery(data)));
    yield removeQuery(videos.map(({ videoId }) => videoId));
  });
};

const videoModel = mongoose.model('Video', schema);

module.exports = videoModel;
