import { VIDEO_ACTIONS } from './video-constants';
import { userSelectors } from '../user';
import fetch from '../service/fetch';

function getVideosByConferenceId({ conferenceId }) {
  const types = [
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_REQUEST,
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_SUCCESS,
    VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_REQUEST,
  ];
  const payload = { conferenceId };

  const callAPI = (state, { API_URL }) =>
    fetch(`${API_URL}/video/${conferenceId}`);

  return { types, callAPI, payload };
}

function getAllVideos() {
  const types = [
    VIDEO_ACTIONS.API_GET_VIDEOS_REQUEST,
    VIDEO_ACTIONS.API_GET_VIDEOS_SUCCESS,
    VIDEO_ACTIONS.API_GET_VIDEOS_FAILURE,
  ];

  const callAPI = (state, { API_URL }) =>
    fetch(`${API_URL}/video`);

  return { types, callAPI };
}

export function getVideos(conferenceId = null) {
  return conferenceId
    ? getVideosByConferenceId({ conferenceId })
    : getAllVideos();
}

export function addVideo({ conferenceId, resourceName, videoId }) {
  const types = [
    VIDEO_ACTIONS.API_ADD_VIDEO_REQUEST,
    VIDEO_ACTIONS.API_ADD_VIDEO_SUCCESS,
    VIDEO_ACTIONS.API_ADD_VIDEO_FAILURE,
  ];

  const callAPI = (state, { API_URL }) => {
    const { token } = userSelectors.userInfoSelector(state);
    const opts = {
      headers: new Headers(),
      body: JSON.stringify({ resourceName, videoId }),
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    };

    opts.headers.append('Content-Type', 'application/json');
    opts.headers.append('Authorization', `Bearer ${token}`);

    return fetch(`${API_URL}/video/${conferenceId}`, opts);
  };

  return { types, callAPI };
}

export function removeVideo({ conferenceId, videoId }) {
  const types = [
    VIDEO_ACTIONS.API_REMOVE_VIDEO_REQUEST,
    VIDEO_ACTIONS.API_REMOVE_VIDEO_SUCCESS,
    VIDEO_ACTIONS.API_REMOVE_VIDEO_FAILURE,
  ];

  const callAPI = (state, { API_URL }) => {
    const { token } = userSelectors.userInfoSelector(state);
    const opts = {
      headers: new Headers(),
      body: JSON.stringify({ videoId }),
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
    };

    opts.headers.append('Authorization', `Bearer ${token}`);
    opts.headers.append('Content-Type', 'application/json');

    return fetch(`${API_URL}/video/${conferenceId}`, opts);
  };

  return { types, callAPI };
}
