import { Router } from 'express';
import passport from 'passport';
import { USER_PAGE_ROUTES } from '../../common/user-page';

const AUTH_COOKIE = 'token';

function login(req, res) {
  const token = req.user.token;

  /**
   * @todo handle missing token
   */
  res.cookie(AUTH_COOKIE, token, { maxAge: 900000, httpOnly: true });
  res.redirect(302, '/');
}

function logout(req, res) {
  res.cookie(AUTH_COOKIE, '', { maxAge: 0 });
  res.redirect(302, '/');
}

export default Router()
  .use(passport.initialize())
  .get('/login/github', passport.authenticate('github'), login)
  .get(USER_PAGE_ROUTES.LOGOUT, logout);
