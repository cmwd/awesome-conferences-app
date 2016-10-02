const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const generateSalt = () =>
  new Promise((resolve, reject) =>
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) =>
        err ? reject(err) : resolve(salt)));

const generateHash = string =>
  salt =>
    new Promise((resolve, reject) =>
        bcrypt.hash(string, salt, (err, hash) =>
          err ? reject(err) : resolve(hash)));

const publicMethods = {
  comparePassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, matched) => {
        if (err) {
          reject(err);
        } else {
          resolve(matched);
        }
      });
    });
  },
  serialize() {
    const { email, _id: id, admin } = this;
    return { email, id, admin };
  },
};

const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: { unique: true },
    required: 'Email address is required',
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  admin: { type: Boolean, default: false },
});

schema.pre('save', function createPasswordHash(next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  } else {
    generateSalt()
      .then(generateHash(user.password))
      .then((password) => {
        user.password = password;
        next();
      })
      .catch(next);
  }
});

Object.assign(schema.methods, publicMethods);

const userModel = mongoose.model('User', schema);

module.exports = userModel;
