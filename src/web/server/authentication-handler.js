import { Router } from 'express';
import passport from 'passport';

const AUTH_COOKIE = 'token';

function setTokenCookie(req, res) {
  const token = req.user.token;

  res.cookie(AUTH_COOKIE, token, { maxAge: 900000, httpOnly: true });
  res.redirect(302, '/');
}

function logout(req, res, next) {
  res.cookie(AUTH_COOKIE, '', { maxAge: 0 });
  res.redirect(302, '/');
}

export default Router()
  .use(passport.initialize())
  .get('/login/github', passport.authenticate('github'), setTokenCookie)
  .get('/logout', logout);
