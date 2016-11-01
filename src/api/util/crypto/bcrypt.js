const bcrypt = require('bcrypt');
const co = require('co');

const SALT_WORK_FACTOR = 10;

function *generateHash(string) {
  const salt = yield new Promise((resolve, reject) =>
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, result) =>
        err ? reject(err) : resolve(result)));

  return new Promise((resolve, reject) =>
      bcrypt.hash(string, salt, (err, result) =>
        err ? reject(err) : resolve(result)));
}

function compareHash(one, another) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(one, another, (err, result) =>
      err ? reject(err) : resolve(result)));
}

module.export = {
  compareHash,
  generateHash: co.wrap(generateHash),
};
