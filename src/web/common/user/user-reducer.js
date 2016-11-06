import { USER_ACTIONS } from './user-constants';

const DEFAULT_STATE = {
  loggedIn: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER_INFO:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};
