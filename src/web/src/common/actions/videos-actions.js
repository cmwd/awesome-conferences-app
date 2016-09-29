import { VIDEO } from '../constants/action-types';
import { setDetailsVideosLoadingState } from './details-actions';
import { getVideos } from '../services/api-service';

export const setVideosDataForConferences = ({ conferenceId, videos }) =>
  ({
    type: VIDEO.SET_VIDEOS_DATA_FOR_CONFERENCE,
    payload: { conferenceId, videos } });

export const fetchDetailsVideos = conferenceId =>
  (dispatch, getState, { API_URL }) => {
    dispatch(setDetailsVideosLoadingState(true));

    return getVideos(API_URL)({ conferenceId })
      .then(({ videos }) => {
        dispatch(setDetailsVideosLoadingState(false));
        dispatch(setVideosDataForConferences({ conferenceId, videos }));
        return Promise.resolve(videos);
      })
      .catch((error) => {
        dispatch(setDetailsVideosLoadingState(false));
        return Promise.reject(error);
      });
  };
