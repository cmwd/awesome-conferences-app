const mongoose = require('mongoose');

const schema = mongoose.Schema({
  screen_name: { type: String, index: { unique: true, dropDups: true } },
  accont_info: {},
});
const TwitterAccountModel = mongoose.model('TwitterAccount', schema);

module.exports = { TwitterAccountModel };
