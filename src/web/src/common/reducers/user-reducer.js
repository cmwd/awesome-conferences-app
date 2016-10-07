import { USER } from '../constants/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case USER.SET_USER_INFO:
      return Object.assign(
        {}, state, { loggedIn: action.token !== null }, action.user);
    default:
      return state;
  }
};
