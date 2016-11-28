const mongoose = require('mongoose');
const co = require('co');
const HTTPError = require('http-errors');
const ConferenceModel = require('./conference-model');
const collectors = require('service/collectors');

const videoModelSchema = {
  resourceName: {
    type: String,
    uppercase: true,
    required: [true, 'resourceName is required']
  },
  resourceUpdateDate: {
    type: Date,
    default: Date.now,
  },
  conferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conference',
  },
  videoId: {
    type: String,
    index: { unique: true, dropDups: true },
    required: [true, 'videoId is required'],
  },
  title: {
    type: String,
    required: [true, 'video title is super important'],
    trim: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    url: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  other: {
    type: mongoose.Schema.Types.Mixed,
  },
};

const schema = mongoose.Schema(videoModelSchema, { timestamps: true });
const create = schema.statics.create;

schema.pre('save', function(next) {
  const video = this;

  co(function* () {
    const conference = yield ConferenceModel.findById(video.conferenceId);

    if (conference === null) HTTPError.BadRequest('Unknown conference.');
  }).then(next, next);
});

schema.method('getVideoDetails', function() {
  const video = this;

  return co(function* () {
    const videoDetails = yield collectors.getVideoDetails(video);
    
    Object.assign(video, videoDetails, { resourceUpdateDate: Date.now() });
    console.log(video.videoId);
    yield video.save();
    return video;
  });
});

module.exports = mongoose.model('Video', schema);
