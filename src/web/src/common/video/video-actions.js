import { VIDEO_ACTIONS } from './video-constants';
import fetch from '../utils/fetch';

export const getVideos = conferenceId => ({
  types: [
    VIDEO_ACTIONS.API_GET_VIDEOS_REQUEST,
    VIDEO_ACTIONS.API_GET_VIDEOS_SUCCESS,
    VIDEO_ACTIONS.API_GET_VIDEOS_REQUEST,
  ],
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/video/${conferenceId}`),
});
