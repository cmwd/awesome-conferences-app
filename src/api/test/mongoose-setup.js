const mongoose = require('mongoose');
const database = require('database');

database({
  onError: e => console.error(e),
  onConnect: () => null,
});

module.exports = {
  reset() {
    mongoose.models = {};
    mongoose.modelSchemas = {};
  },
};
