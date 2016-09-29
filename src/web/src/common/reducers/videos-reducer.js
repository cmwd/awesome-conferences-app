import { VIDEO } from '../constants/action-types';

const getVideos = (state, { conferenceId, videos }) =>
  videos.length
    ? [].concat(
        state.filter(v => v.conferenceId !== conferenceId),
        { conferenceId, videos })
    : state;
export default (state = [], action) => {
  switch (action.type) {
    case VIDEO.SET_VIDEOS_DATA_FOR_CONFERENCE:
      return getVideos(state, action.payload);
    default:
      return state;
  }
};
