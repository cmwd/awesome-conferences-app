const { Schema, Types } = require('mongoose');

const eventSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    default: () => Types.ObjectId(),
  },
  date: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  }
});

module.exports = eventSchema;
