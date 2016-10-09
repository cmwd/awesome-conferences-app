import { VIDEO_ACTIONS } from './video-constants';
import { getVideos } from '../services/api-service';

export const addVideos = data =>
  ({ type: VIDEO_ACTIONS.ADD_VIDEOS, data });

export const fetchConferenceVideos = conferenceId =>
  (dispatch, getState, { API_URL }) =>
    getVideos(API_URL)({ conferenceId })
     .then((data) => {
        dispatch(addVideos(data));
        return Promise.resolve(data);
     });
