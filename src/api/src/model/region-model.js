const mongoose = require('mongoose');

const RegionModel = mongoose.Schema({
  name: String,
  conferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }],
});

module.exports = mongoose.model('Region', RegionModel);
