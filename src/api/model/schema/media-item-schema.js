const { isURL } = require('validator');
const { Schema, Types } = require('mongoose');

const MEDIA_TYPE = {
  LOGO: 'LOGO',
  BANNER: 'BANNER',
};
const mediaItemSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    default: () => Types.ObjectId(),
  },
  type: {
    type: String,
    enum: [
      MEDIA_TYPE.LOGO,
      MEDIA_TYPE.BANNER,
    ],
    uppercase: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: [isURL, 'Invalid media url.']
  }
});

module.exports = mediaItemSchema;
module.exports.MEDIA_TYPE = MEDIA_TYPE;
