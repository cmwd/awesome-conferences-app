import * as types from '../constants/action-types';
import API from '../services/api-service';
import { fetch } from 'global';

const { getConferences } = API(fetch);

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
      getConferences(API_URL)({ limit, offset })
        .then(({ conferences }) =>
          dispatch(setConferencePageData(conferences)))
        .then(() => dispatch(setConferencesLoadingState(false)))
        .catch(err => console.error(err));
    }
  };
