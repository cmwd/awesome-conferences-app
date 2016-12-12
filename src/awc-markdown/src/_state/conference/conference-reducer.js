import { UPDATE_CONFERENCE_INFO } from '../action-types';

function conference(state = {}, action) {
    switch (action.type) {
      case UPDATE_CONFERENCE_INFO:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
}

export default conference;
