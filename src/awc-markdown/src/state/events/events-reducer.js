import { combineReducers } from 'redux';
import uniqueId from 'lodash/uniqueId';

import {
  CREATE_EVENT,
  DESTROY_EVENT,
  UPDATE_EVENT_DESCRIPTION
} from '../action-types';
import { DESCRIPTION_DEFAULT_STATE, TEST_TALK } from './events-constants';

function talks(state = [TEST_TALK], { type, payload }) {
  switch (type) {
    case 'ACTIONS.ADD_TALK':
      return state.concat(payload);
    case 'ACTIONS.UPDATE_TALK':
      return state
        .filter(({ key }) => key !== payload.key)
        .concat(payload);
    case 'ACTIONS.DESTROY_TALK':
      return state
        .filter(({ key }) => key !== payload.key);
    default:
      return state;
  }
}

function description(state = DESCRIPTION_DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case UPDATE_EVENT_DESCRIPTION:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}

function uuid(state = uniqueId('uuid-')) {
  return state;
}

function events(state, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return state.concat(action.payload);
    case DESTROY_EVENT:
      return state.filter(e => e.uuid !== action.uuid);
    default:
      return state;
  }
}

const eventReducer = combineReducers({ talks, description, uuid });

export default function(state = [], action) {
  return events(state, action)
    .map(event =>
      !action.uuid || event.uuid === action.uuid
        ? eventReducer(event, action)
        : event
    );
}
