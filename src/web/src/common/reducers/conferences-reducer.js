import * as types from '../constants/action-types';

export const conferences = (state = [], action) => {
  switch (action.type) {
    case types.SET_CONFERENCES_PAGE_DATA:
      return action.conferences;
    default:
      return state;
  }
};

export const pages = (state = {}, action) => {
  switch (action.type) {
    case types.SELECT_CONFRENCES_PAGE:
      return { ...state, current: action.page };
    default:
      return state;
  }
};

export const conferencesLoadingState = (state = false, action) => {
  switch (action.type) {
    case types.SET_CONFERENCES_LOADING_STATE:
      return action.state;
    default:
      return state;
  }
};
