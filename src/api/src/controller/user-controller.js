const co = require('co-express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const { userModel } = require('../model');

function *create({ body }, res) {
  const { email, password } = body;
  const user = yield userModel.create({ email, password });

  res.json(user.serialize());
}

module.exports =
  Router()
    .use(bodyParser.urlencoded({ extended: true }))
    .post('/', co(create));
