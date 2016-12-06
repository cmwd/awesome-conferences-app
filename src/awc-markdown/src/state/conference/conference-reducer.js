import { CONFERENCE_DEFAULT_STATE } from './conference-constants';
import { UPDATE_CONFERENCE_INFO } from '../action-types';

function conference(state = CONFERENCE_DEFAULT_STATE, action) {
    switch (action.type) {
      case UPDATE_CONFERENCE_INFO:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
}

export default conference;
