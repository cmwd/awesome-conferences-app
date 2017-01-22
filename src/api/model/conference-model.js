const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');

const MODEL_NAME = 'Conference';

const schema = new mongoose.Schema({
  filePath: { type: String, index: { unique: true, dropDups: true } },
  conference: {
    name: { type: String },
    description: { type: String },
    email: { type: String, validate: [isEmail, 'Invalid email'] },
    web: { type: String, validator: [isURL, 'Invalid URL adress'] },
    facebook_id: { type: String },
    twitter_id: { type: String },
  },
  events: [],
});

const fileQuery = (file) => {
  const { filePath } = file.get();
  return { filePath };
};

const getProps = (file) => {
  const {
    fileContent: { conference, events },
    filePath,
  } = file.get();

  return { conference, events, filePath };
};

schema.statics.updateFiles = function updateFiles(files) {
  const Model = mongoose.model(MODEL_NAME);
  const iterator = file =>
    Model.update(fileQuery(file), getProps(file));

  return Promise.all(files.map(iterator));
};

schema.statics.createFiles = function createFiles(files) {
  const Model = mongoose.model(MODEL_NAME);
  const iterator = file =>
    Model.create(getProps(file));

  return Promise.all(files.map(iterator));
};

schema.statics.removeFiles = function removeFiles(files) {
  const Model = mongoose.model(MODEL_NAME);
  const iterator = file =>
    Model.remove(fileQuery(file));

  return Promise.all(files.map(iterator));
};

module.exports = mongoose.model(MODEL_NAME, schema);

