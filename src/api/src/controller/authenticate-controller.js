const co = require('co-express');
const { Router } = require('express');
const { tokenSecured } = require('../service/authentication');
const { userModel } = require('../model');
const { jwt } = require('../service/crypto');

const createUserToken = user =>
  jwt.generateToken(user.serialize());

function *authenticateWithService({ user: userInfo, params }, res) {
  const info = Object.assign({}, params, userInfo);
  let user = yield userModel.findByService(info);

  if (user === null) {
    user = yield userModel.createFromService(info);
  }

  const token = createUserToken(user);

  res.json(
    Object.assign(
      {}, { token, userInfo: user.serialize() }));
}

module.exports =
  Router()
    .post('/:service', tokenSecured, co(authenticateWithService));
