const { Schema } = require('mongoose');

const SOCIAL_SERVICE = {
  TWITTER: 'TWITTER',
  YOUTUBE: 'YOUTUBE',
};

const socialServiceSchema = new Schema({
  service: {
    type: String,
    enum: [
      SOCIAL_SERVICE.TWITTER,
      SOCIAL_SERVICE.YOUTUBE,
    ],
    uppercase: true,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
});

module.exports = socialServiceSchema;
module.exports.SOCIAL_SERVICE = SOCIAL_SERVICE;
