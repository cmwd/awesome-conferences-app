import { RESOURCE_ACTIONS } from './resource-constants';
import { userSelectors } from '../user';

export const setNavigationTabsData = navigationTabs =>
  ({ type: RESOURCE_ACTIONS.SET_NAVIGATION_TABS_DATA, navigationTabs });

export const setYoutubeImporter = youtubeVideoImporter =>
  ({ type: RESOURCE_ACTIONS.SET_YOUTUBE_IMPORTER_STATE, youtubeVideoImporter });

export const setYoutubeVideoSelect = youtubeSelectedVideoItems =>
  ({
    type: RESOURCE_ACTIONS.SET_YOUTUBE_VIDEO_SELECT,
    youtubeSelectedVideoItems,
  });

export const toggleVideo = item =>
  ({ type: RESOURCE_ACTIONS.TOGGLE_YOUTUBE_VIDEO_SELECT, item });

/**
 * @todo Move this action to video actions
 */

export const addVideo = ({ conferenceId, resourceName, videoId }) =>
  ({
    types: [
      RESOURCE_ACTIONS.API_ADD_VIDEO_REQUEST,
      RESOURCE_ACTIONS.API_ADD_VIDEO_SUCCESS,
      RESOURCE_ACTIONS.API_ADD_VIDEO_FAILURE,
    ],
    callAPI: (state, { API_URL }) => {
      const { token } = userSelectors.userInfoSelector(state);
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const opts = {
        headers,
        body: JSON.stringify({ resourceName, videoId }),
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
      };

      return fetch(`${API_URL}/video/${conferenceId}`, opts)
        .then(response => response.json());
    },
  });

export const removeVideo = ({ conferenceId, videoId }) =>
  ({
    types: [
      RESOURCE_ACTIONS.API_REMOVE_VIDEO_REQUEST,
      RESOURCE_ACTIONS.API_REMOVE_VIDEO_SUCCESS,
      RESOURCE_ACTIONS.API_REMOVE_VIDEO_FAILURE,
    ],
    callAPI: (state, { API_URL }) => {
      const { token } = userSelectors.userInfoSelector(state);
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const opts = {
        headers,
        body: JSON.stringify({ videoId }),
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
      };

      return fetch(`${API_URL}/video/${conferenceId}`, opts)
        .then(response => response.json());
    },
  });

