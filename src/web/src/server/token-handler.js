import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../config';

export default function () {
  return (req, res, next) => {
    if (!req.cookies.token) {
      req.pocket.set('user', { loggedIn: false });
      next(null);
    } else {
      jwt.verify(
        req.cookies.token, TOKEN_SECRET,
        (err, user) => {
          req.pocket.set('user', {
            ...user,
            token: req.cookies.token,
            loggedIn: true,
          });
          next(null);
        });
    }
  };
}
