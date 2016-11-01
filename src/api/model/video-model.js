const mongoose = require('mongoose');

const { Schema } = mongoose;
const toUpperCase = str => str.toUpperCase();
const schema = mongoose.Schema({
  resourceId: { type: String, index: { unique: true, dropDups: true } },
  resourceName: { type: String, set: toUpperCase },
  conferenceId: { type: Schema.Types.ObjectId, ref: 'Conference' },
  data: Schema.Types.Mixed,
});

Object.assign(schema.statics, {
  setVideos(resourceName, conferenceId, videos) {
    const updateProcess = videos.map(data =>
      this.update(
        { conferenceId, resourceName, resourceId: data.id },
        {
          $set: {
            conferenceId,
            resourceName,
            resourceId: data.id,
            data,
          },
        },
        { upsert: true }
      ));
    const removeProcess = this.remove(
      {
        conferenceId,
        resourceName,
        resourceId: { $nin: videos.map(({ id }) => id) },
      }
    );

    return Promise.all([...updateProcess, removeProcess]);
  },
});

const videoModel = mongoose.model('Video', schema);

module.exports = videoModel;
