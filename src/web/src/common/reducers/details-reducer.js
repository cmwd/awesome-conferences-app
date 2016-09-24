import * as types from '../constants/action-types';

const DEFAULT_STATE = {
  loading: false,
  pages: {},
};

const createPagesObject = (fromState, action) => {
  const { conferenceId, data } = action.data;

  return { ...fromState, ...{ [conferenceId]: data } };
};

export const detailsPage = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SET_DETAILS_LOADING_STATE:
      return { ...state, loading: action.loading };

    case types.SET_DETAILS_PAGE_DATA:
      return { ...state, pages: createPagesObject(state.pages, action) };

    default:
      return state;
  }
};
