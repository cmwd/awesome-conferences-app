import { DETAILS_PAGE } from '../constants/action-types';

const DEFAULT_STATE = {
  loading: false,
  loadingVideos: false,
  videos: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case DETAILS_PAGE.SET_LOADING_STATE:
      return { ...state, loading: action.loading };

    case DETAILS_PAGE.SET_VIDEOS_LOADING_STATE:
      return { ...state, loadingVideos: action.loadingVideos };

    case DETAILS_PAGE.SET_VIDEOS_DATA:
      return { ...state, videos: action.videos };

    default:
      return state;
  }
};
