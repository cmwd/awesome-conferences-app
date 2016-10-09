import { USER_ACTIONS } from './user-constants';

export const setUserInfo = user =>
  ({ type: USER_ACTIONS.SET_USER_INFO, user });
