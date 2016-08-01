const mongoose = require('mongoose');

const R_YOUTUBE = 'YOUTUBE';
const R_VIMEO = 'VIMEO';

const resources = [R_YOUTUBE, R_VIMEO];
const schema = mongoose.Schema({
  resourceName: { type: String, enum: resources },
  userName: String,
});
const ResourceModel = mongoose.model('Resource', schema);

module.exports = { ResourceModel };
