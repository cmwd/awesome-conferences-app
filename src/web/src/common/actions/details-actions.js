import { DETAILS_PAGE } from '../constants/action-types';
import { fetchConference } from './conferences-actions';

export const setLoadingState = loading =>
  ({ type: DETAILS_PAGE.SET_LOADING_STATE, loading });

export const setDetailsVideosLoadingState = loadingVideos =>
  ({ type: DETAILS_PAGE.SET_VIDEOS_LOADING_STATE, loadingVideos });

// export const setVideosData = videos =>
//   ({ type: DETAILS_PAGE.SET_VIDEOS_DATA, videos });

export const fetchConferenceIfNeeded = slug =>
  (dispatch, getState, opts) => {
    if (getState().conferences.find(c => c.slug === slug)) {
      return Promise.resolve(null);
    }

    dispatch(setLoadingState(true));
    return fetchConference(slug)(dispatch, getState, opts)
      .then((data) => {
        dispatch(setLoadingState(false));
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch(setLoadingState(false));
        return Promise.reject(error);
      });
  };
