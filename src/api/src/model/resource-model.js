const mongoose = require('mongoose');

const R_YOUTUBE = 'YOUTUBE';
const R_VIMEO = 'VIMEO';
const R_TWITTER = 'TWITTER';
const R_AWESOMELIST = 'AWESOMELIST';

const toUpperCase = str => str.toUpperCase();

const resources = [R_YOUTUBE, R_VIMEO, R_TWITTER, R_AWESOMELIST];
const schema = mongoose.Schema({
  resourceName: {
    type: String,
    enum: resources,
    set: toUpperCase,
  },
  userId: {
    type: String,
    required: false,
    index: true,
  },
  data: mongoose.Schema.Types.Mixed,
});

const resourceModel = mongoose.model('Resource', schema);

module.exports = { resourceModel };
