const mongoose = require('mongoose');

const RegionModel = mongoose.Schema({
  city: { type: String, index: { unique: true, dropDups: true } },
  country: String,
  conferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }],
});

module.exports = mongoose.model('Location', RegionModel);
