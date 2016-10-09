import { VIDEO_ACTIONS } from './video-constants';

const DEFAULT_STATE = {
  items: {},
  conferenceItems: {},
};

const concatItems = (stateItems, videos) =>
  videos.reduce((result, video) => {
    return Object.assign({}, result, {
      [video._id]: video,
    });
  }, stateItems);

const concatconferenceItems = (stateVideos, videos) =>
  videos.reduce((result, { conferenceId, _id: videoId }) => {
    const items = result[conferenceId] || [];
    items.push(videoId);

    return Object.assign({}, result, { [conferenceId]: items });
  }, stateVideos);

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VIDEO_ACTIONS.ADD_VIDEOS:
      return Object.assign({}, state, {
        items: concatItems(state.items, action.data.videos),
        conferenceItems: concatconferenceItems(
          state.conferenceItems, action.data.videos),
      });
    default:
      return state;
  }
};
