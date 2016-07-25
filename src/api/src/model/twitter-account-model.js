const mongoose = require('mongoose');

const RegionModel = mongoose.Schema({
  screen_name: { type: String, index: { unique: true, dropDups: true } },
  accont_info: {},
});

module.exports = mongoose.model('TwitterAccount', RegionModel);
