import { RESOURCE_ACTIONS } from './resource-constants';

const DEFAULT_STATE = {
  youtubeVideoImporter: {
    videoId: '',
    conferenceId: null,
  },
  youtubeSelectedVideoItems: [],
};

const toggleVideoItem = (selectedVideos, item) => {
  const items = selectedVideos
    .filter(({ videoId }) => videoId !== item.videoId);

  return items.length === selectedVideos.length
    ? [item, ...items]
    : items;
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RESOURCE_ACTIONS.SET_NAVIGATION_TABS_DATA:
      return Object.assign({}, state, {
        navigationTabs: Object.assign(
          {}, state.navigationTabs, action.navigationTabs),
      });

    case RESOURCE_ACTIONS.SET_YOUTUBE_IMPORTER_STATE:
      return Object.assign({}, state, {
        youtubeVideoImporter: Object.assign(
          {}, state.youtubeVideoImporter, action.youtubeVideoImporter),
      });

    case RESOURCE_ACTIONS.SET_YOUTUBE_VIDEO_SELECT:
      return Object.assign({}, state, {
        youtubeSelectedVideoItems: action.youtubeSelectedVideoItems,
      });

    case RESOURCE_ACTIONS.TOGGLE_YOUTUBE_VIDEO_SELECT:
      return Object.assign({}, state, {
        youtubeSelectedVideoItems: toggleVideoItem(
          state.youtubeSelectedVideoItems, action.item),
      });

    default:
      return state;
  }
};
