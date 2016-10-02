const passport = require('passport');
const bodyParser = require('body-parser');
const { Router } = require('express');
const { jwt } = require('../service/crypto');

function authenticate({ user }, res) {
  const token = jwt.generateToken(user);

  res.json({ user, token });
}

module.exports =
  Router()
    .use(bodyParser.urlencoded({ extended: true }))
    .post('/', passport.authenticate('local'), authenticate);
