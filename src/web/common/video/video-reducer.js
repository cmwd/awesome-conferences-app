import { VIDEO_ACTIONS } from './video-constants';

const DEFAULT_STATE = { items: [] };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VIDEO_ACTIONS.API_GET_VIDEOS_SUCCESS:
      return Object.assign({}, state, { items: action.response.videos });

    case VIDEO_ACTIONS.API_GET_VIDEOS_BY_CONFERENCE_ID_SUCCESS:
      const items = state.items
        .filter(({ conferenceId }) => conferenceId !== action.conferenceId)
        .concat(action.response.videos);
      return Object.assign({}, state, { items });

    default:
      return state;
  }
};
