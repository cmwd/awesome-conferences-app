const mongoose = require('mongoose');
const co = require('co');
const { isEmail } = require('validator');
const { bcrypt } = require('util/crypto');

const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    },
    required: 'Email address is required',
    validate: [isEmail, 'Please fill a valid email address'],
  },
  name: { type: String, default: '' },
  password: { type: String },
  services: [{
    id: { type: String },
    serviceName: { type: String, uppercase: true },
  }],
  admin: { type: Boolean, default: false },
});

function* preSaveHook(model) {
  let result = {};

  if (model.isModified('password')) {
    const password = yield bcrypt.generateHash(model.password);
    result = Object.assign({}, result, { password });
  }

  return result;
}

schema.pre('save', function preSaveHookWrapper(next) {
  co(preSaveHook(this))
    .then((user) => {
      Object.assign(this, user);
      next();
    })
    .catch(next);
});

/**
 * Public members
 */
Object.assign(schema.methods, {
  comparePassword(password) {
    return bcrypt.comparePassword(password, this.password);
  },

  serialize() {
    const { email, _id: id, admin, name } = this;
    return { email, id, admin, name };
  },
});

/**
 * Static members
 */
Object.assign(schema.statics, {
  findByService({ id, service }) {
    const serviceName = service.toUpperCase();
    return this.findOne({
      services: { $elemMatch: { serviceName, id } },
    });
  },

  createFromService({ id, service, email, name }) {
    const serviceName = service.toUpperCase();
    return this.create({
      email,
      name,
      services: [{ id, serviceName }],
    });
  },
});

const userModel = mongoose.model('User', schema);

module.exports = userModel;
