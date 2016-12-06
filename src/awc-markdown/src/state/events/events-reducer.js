import { combineReducers } from 'redux';
import uniqueId from 'lodash/uniqueId';

import {
  CREATE_EVENT,
  DESTROY_EVENT,
  UPDATE_EVENT_DESCRIPTION
} from '../action-types';
import { DESCRIPTION_DEFAULT_STATE } from './events-constants';
import talks from './events-talks-reducer';

function uuid(state = uniqueId('uuid-')) {
  return state;
}

function description(state = DESCRIPTION_DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case UPDATE_EVENT_DESCRIPTION:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}

function eventsReducer(state, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return state.concat(action.payload);
    case DESTROY_EVENT:
      return state.filter(e => e.uuid !== action.uuid);
    default:
      return state;
  }
}

const eventReducerIterator = combineReducers({ talks, description, uuid });

export default function(state = [], action) {
  return eventsReducer(state, action)
    .map(event =>
      !action.uuid || event.uuid === action.uuid
        ? eventReducerIterator(event, action)
        : event
    );
}
