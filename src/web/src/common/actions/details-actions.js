import * as types from '../constants/action-types';
import { getConferenceDetails } from '../services/api-service';

export const setDetailsLoadingState = loading =>
  ({ type: types.SET_DETAILS_LOADING_STATE, loading });

export const setDetailsPageData = data =>
  ({ type: types.SET_DETAILS_PAGE_DATA, data });

export const fetchDetailsPage = conferenceId =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      dispatch(setDetailsLoadingState(true));
      getConferenceDetails(API_URL)({ conferenceId })
        .then((data) => {
          dispatch(setDetailsLoadingState(false));
          dispatch(setDetailsPageData({ conferenceId, data }));
          resolve(data);
        })
        .catch(reject);
    });

export const fetchDetailsPageIfNeeded = conferenceId =>
  (...args) => {
    const [, getState] = args;
    const { detailsPage: { pages } } = getState();

    return pages[conferenceId]
      ? Promise.resolve()
      : fetchDetailsPage(conferenceId)(...args);
  };
