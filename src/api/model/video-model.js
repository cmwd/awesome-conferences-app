const mongoose = require('mongoose');

const thumbnailSchema = {
  url: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
};
const videoModelSchema = {
  resourceName: {
    type: String,
    uppercase: true,
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
  thumbnails: {
    low: thumbnailSchema,
    mid: thumbnailSchema,
    high: thumbnailSchema,
  },
  other: {
    type: mongoose.Schema.Types.Mixed,
  },
};

const schema = mongoose.Schema(videoModelSchema, { timestamps: true });

module.exports = mongoose.model('Video', schema);
