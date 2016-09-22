import * as types from '../constants/action-types';
import { getConferences } from '../services/api-service';

export const setConferencePageData = data =>
  ({ type: types.SET_CONFERENCES_PAGE_DATA, data });

export const setConferencesLoadingState = state =>
  ({ type: types.SET_CONFERENCES_LOADING_STATE, state });

export const fetchConferences = page =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      const {
        conferencePage: {
          pages: { itemsLimit: limit = 20 },
        },
      } = getState();
      const offset = limit * (parseInt(page, 10) - 1);

      dispatch(setConferencesLoadingState(true));
      getConferences(API_URL)({ limit, offset })
        .then(data => {
          dispatch(setConferencePageData(data));
          dispatch(setConferencesLoadingState(false));
          resolve(data);
        })
        .catch(reject);
    });

export const fetchConferencesIfNeeded = page =>
  (...args) => {
    const [, getState] = args;
    const { conferencePage: { conferences } } = getState();

    return conferences.length
      ? Promise.resolve
      : fetchConferences(page)(...args);
  };

export const selectConferencePage = page =>
  (...args) => {
    const [dispatch, getState] = args;
    const { conferencePage: { pages: { current } } } = getState();

    if (current !== page) {
      fetchConferences(page)(...args)
        .then(() =>
          dispatch({ type: types.SELECT_CONFRENCES_PAGE, page }));
    }
  };
