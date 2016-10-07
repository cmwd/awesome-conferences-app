// import co from 'co';
import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-github';
import {
  BACKEND_API_URL,
  TOKEN_SECRET,
  AUTH_GITHUB_ID as clientID,
  AUTH_GITHUB_SECRET as clientSecret,
  AUTH_GITHUB_CALLBACK as callbackURL,
} from '../../../../config';
import { authenticateWithService } from '../../../common/services/api-service';

const service = 'GITHUB';
const TOKEN_DEFAULTS = {
  expiresIn: '1m',
};

function signIn(accessToken, refreshToken, profile, next) {
  const { email, id, name } = profile;
  const token = jwt.sign({ email, id, name }, TOKEN_SECRET, TOKEN_DEFAULTS);

  authenticateWithService(
    BACKEND_API_URL)(
    { token, service })
      .then((user) => { next(null, user); })
      .catch(next);
}

const githubStrategy = () =>
  new Strategy(
    { clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, { _json: profile }, next) => {
      signIn(accessToken, refreshToken, profile, next);
    }
  );

export default githubStrategy;
