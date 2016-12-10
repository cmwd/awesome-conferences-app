import { combineReducers } from 'redux';
import uniqueId from 'lodash/uniqueId';

import {
  CREATE_EVENT,
  DESTROY_EVENT,
  UPDATE_EVENT_DESCRIPTION,
  CREATE_EVENT_TALK,
  UPDATE_EVENT_TALK,
  DESTROY_EVENT_TALK,
} from '../action-types';
import { DESCRIPTION_DEFAULT_STATE, TEST_TALK } from './events-constants';

function uuid(state = uniqueId('uuid-')) {
  return state;
}

function talk(state, { type, payload }) {
  switch (type) {
    case CREATE_EVENT_TALK:
      return Object.assign({}, payload, {
        uuid: uuid(),
      });
    case UPDATE_EVENT_TALK:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}

function talks(state = [TEST_TALK], action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EVENT_TALK:
      return [
        ...state,
        talk(undefined, action),
      ];
    case UPDATE_EVENT_TALK:
      return state.map(talkObj =>
        talkObj.uuid !== payload.uuid
          ? talkObj
          : talk(talkObj, action));
    case DESTROY_EVENT_TALK:
      return state.filter(talkObj =>
        talkObj.uuid !== payload.uuid);
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

export default function (state = [], action) {
  return eventsReducer(state, action)
    .map(event =>
      !action.uuid || event.uuid === action.uuid
        ? eventReducerIterator(event, action)
        : event
    );
}
