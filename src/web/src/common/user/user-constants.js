import {
  BASE_PATH,
  AUTH_GITHUB_ID,
} from '../../../config';

export const USER_ACTIONS = {
  SET_USER_INFO: 'APP__SET_USER_INFO',
};

export const USER_ROUTES = {
  LOGIN: `${BASE_PATH}/user/login`,
  LOGOUT: `${BASE_PATH}/user/logout`,
  GITHUB_AUTHORIZE:
    `https://github.com/login/oauth/authorize/?client_id=${AUTH_GITHUB_ID}`,
};
