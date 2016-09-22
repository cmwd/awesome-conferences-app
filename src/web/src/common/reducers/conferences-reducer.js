import * as types from '../constants/action-types';

const D_CONFERENCE_PAGE = {
  pages: {},
  conferences: [],
};
export const conferencePage = (state = D_CONFERENCE_PAGE, action) => {
  const { type, data, page } = action;

  switch (type) {

    case types.SET_CONFERENCES_PAGE_DATA:
      return {
        pages: { ...state.pages, ...data.pages },
        conferences: data.conferences,
      };

    case types.SELECT_CONFRENCES_PAGE:
      return {
        pages: { ...state.pages, page },
        conferences: state.conferences,
      };

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
