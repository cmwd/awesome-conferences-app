const passport = require('passport');
const localStrategy = require('./local-strategy');
const expressJwt = require('express-jwt');
const HTTPError = require('http-errors');
const { TOKEN_SECRET } = require('../../../config');

const initialize = (app) => {
  passport.use(localStrategy());

  passport.serializeUser(
    (user, done) => {
      done(null, user);
    });

  passport.deserializeUser(
    (user, done) => {
      done(null, user);
    });

  app.use(passport.initialize());
};

const decryptMiddleware = expressJwt({ secret: TOKEN_SECRET });
const isAdmin = ({ user }, res, next) => {
  next(user.admin ? null : HTTPError.Unauthorized());
};

module.exports = initialize;
module.exports.tokenSecured = decryptMiddleware;
module.exports.isAdmin = isAdmin;
