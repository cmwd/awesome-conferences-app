import uniqueId from 'lodash/uniqueId';

import {
  CREATE_EVENT_TALK,
  DESTROY_EVENT_TALK,
  UPDATE_EVENT_TALK
} from '../action-types';
import { TEST_TALK } from './events-constants';

function uuid(state = uniqueId('uuid-')) {
  return state;
}

function talkReducerIterator(state, action) {
  return Object.assign({}, state, {
    uuid: uuid(action.uuid)
  });
}

function talksReducer(state, { type, payload }) {
  switch (type) {
    case CREATE_EVENT_TALK:
      return state.concat(payload);
    case UPDATE_EVENT_TALK:
      return Object.assign({},
        state.find(({ uuid }) => uuid === payload.uuid),
        payload);
    case DESTROY_EVENT_TALK:
      return state.filter(({ uuid }) => uuid !== payload.uuid);
    default:
      return state;
  }
}

export default function(state = [TEST_TALK], action) {
  return talksReducer(state, action)
    .map(talk =>
      !talk.uuid || talk.uuid === action.uuid
        ? talkReducerIterator(talk, action)
        : talk);
}
