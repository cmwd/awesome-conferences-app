import { USER } from '../constants/action-types';

export const setUserInfo = user =>
  ({ type: USER.SET_USER_INFO, user });
