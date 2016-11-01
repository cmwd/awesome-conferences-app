import { VIDEO_ACTIONS } from './video-constants';
import fetch from '../utils/fetch';

export const getVideosByConferenceId = conferenceId => ({
  types: [
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_REQUEST,
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_SUCCESS,
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_REQUEST,
  ],
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/video/${conferenceId}`),
});

export const getVideos = () => ({
  types: [
    VIDEO_ACTIONS.API_GET_VIDEOS_REQUEST,
    VIDEO_ACTIONS.API_GET_VIDEOS_SUCCESS,
    VIDEO_ACTIONS.API_GET_VIDEOS_FAILURE,
  ],
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/video`),
});
