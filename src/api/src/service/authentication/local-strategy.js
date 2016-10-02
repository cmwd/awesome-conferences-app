const Strategy = require('passport-local');
const co = require('co');
const { userModel } = require('../../model');

function *getUser(email, password, next) {
  const user = yield userModel.findOne({ email });

  if (!user) {
    next(null, false, { message: 'Unknown user' });
  } else {
    const isValidPassword = yield user.comparePassword(password);

    if (!isValidPassword) {
      next(null, false, { message: 'Password is invalid.' });
    } else {
      next(null, user.serialize());
    }
  }
}

const localStrategy = () =>
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, next) => {
      co(getUser(email, password, next))
        .catch(next);
    }
  );

module.exports = localStrategy;
