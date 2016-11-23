const _ = require('lodash');
const co = require('co');
const mongoose = require('mongoose');
const urlSlugs = require('mongoose-url-slugs');
const HTTPError = require('http-errors');
const { mediaItemSchema, socialServiceSchema, eventSchema } = require('./schema');

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

conferenceSchema.statics.createQuery = ({ ids, slugs }) => {
  return Object.assign({},
    ids ? { _id: { $in : ids } } : null,
    slugs ? { slug: { $in: slugs } } : null);
};

conferenceSchema.pre('findOne', function(next) {
  next(this._castError
    ? HTTPError(400, this._castError.message)
    : null);
});

module.exports = mongoose.model('Conference', conferenceSchema);
