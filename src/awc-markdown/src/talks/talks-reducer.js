import { combineReducers } from 'redux';
import { ACTIONS } from './talks-constants';

const testTalk = {
  speaker: 'I am the Speaker!',
  title: 'And this is my TALK',
  twitter: '@speaker',
  email: 'noope@noop.com',
  video: 'youtube',
  key: 'adsas'
};

const uiDefaultState = {
  inputMode: false,
  editEntries: []
};

function entries(state = [testTalk], { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TALK:
      return state.concat(payload);
    case ACTIONS.UPDATE_TALK:
      return state
        .filter(({ key }) => key !== payload.key)
        .concat(payload);
    case ACTIONS.DESTROY_TALK:
      return state
        .filter(({ key }) => key !== payload.key);
    default:
      return state;
  }
}

function ui(state = uiDefaultState, { type, payload }) {
  switch (type) {
    case ACTIONS.TOGGLE_INPUT_MODE:
      return Object.assign({}, state, { inputMode: !state.inputMode });
    default:
      return state;
  }
}

export default combineReducers({ entries, ui });
