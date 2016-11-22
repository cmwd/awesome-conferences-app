const _ = require('lodash');
const co = require('co');
const mongoose = require('mongoose');
const urlSlugs = require('mongoose-url-slugs');
const HTTPError = require('http-errors');
const { mediaItemSchema, socialServiceSchema, eventSchema } = require('./schema');
const resourceModel = require('./resource-model');
const videoModel = require('./video-model');

const { Schema } = mongoose;
const conferenceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  media: [mediaItemSchema],
  socialServices: [socialServiceSchema],
  events: [eventSchema],
});

conferenceSchema.plugin(urlSlugs('name', { field: 'slug' }));
conferenceSchema.set('toJSON', { virtuals: true });

conferenceSchema.statics.findByIds = function byIds(ids) {
  return this.find({ _id: { $in: ids } });
};
conferenceSchema.statics.findBySlugs = function bySlugs(slugs) {
  return this.find({ slug: { $in: slugs }});
}

conferenceSchema.pre('findOne', function(next) {
  next(this._castError
    ? HTTPError(400, this._castError.message)
    : null);
});

module.exports = mongoose.model('Conference', conferenceSchema);
