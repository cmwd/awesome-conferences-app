import { RESOURCE_ACTIONS } from './resource-constants';

const DEFAULT_STATE = {
  videoImporterForm: {
    videoId: '',
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RESOURCE_ACTIONS.UPDATE_VIDEO_IMPORTER_FORM:
      return Object.assign({}, state, { videoImporterForm: action.form });

    default:
      return state;
  }
};
