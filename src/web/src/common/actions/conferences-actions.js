import * as types from '../constants/action-types';
import { getConferences } from '../services/api-service';

export const setConferencePageData = conferences =>
  ({ type: types.SET_CONFERENCES_PAGE_DATA, conferences });

export const setConferencesLoadingState = state =>
  ({ type: types.SET_CONFERENCES_LOADING_STATE, state });

export const selectConferencePage = page =>
  (dispatch, getState, { API_URL }) => {
    const { pages: { itemsLimit: limit, current } } = getState();
    const offset = limit * (page - 1);

    if (current !== page) {
      dispatch({ type: types.SELECT_CONFRENCES_PAGE, page });
      dispatch(setConferencesLoadingState(true));
      getConferences(fetch)(API_URL)({ limit, offset })
        .then(({ conferences }) =>
          dispatch(setConferencePageData(conferences)))
        .then(() => dispatch(setConferencesLoadingState(false)))
        .catch(err => console.error(err));
    }
  };
