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
 * @todo Mvoe this action to video actions
 */
export const saveVideos = ({ conferenceId, resourceName, items }) =>
  ({
    types: [
      RESOURCE_ACTIONS.API_GET_SAVE_VIDEOS_REQUEST,
      RESOURCE_ACTIONS.API_GET_SAVE_VIDEOS_SUCCESS,
      RESOURCE_ACTIONS.API_GET_SAVE_VIDEOS_FAILURE,
    ],
    callAPI: (state, { API_URL }) => {
      const { token } = userSelectors.userInfoSelector(state);
      const body = JSON.stringify({
        resourceName,
        videoIds: items.map(({ videoId }) => videoId),
      });
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const opts = {
        headers,
        body,
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
      };

      return fetch(`${API_URL}/video/${conferenceId}`, opts);
    },
  });
