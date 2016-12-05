import uniqueId from 'lodash/uniqueId';
import { ACTIONS } from './talks-constants';

export function addTalk(talkObj) {
  const key = uniqueId('talk-');
  const payload = Object.assign({}, talkObj, { key });
  const type = ACTIONS.ADD_TALK;

  return { type, payload };
}

export function updateTalk(key, talkObj) {
  const type = ACTIONS.UPDATE_TALK;
  const payload = Object.assign({}, talkObj, { key });

  return { type, payload };
}

export function destroyTalk(key) {
  const type = ACTIONS.DESTROY_TALK;
  const payload = { key };

  return { type, payload };
}

export function toggleComponentMode() {
  const type = ACTIONS.TOGGLE_INPUT_MODE;
  const payload = {};

  return { type, payload };
}
