import { uniqueId } from 'lodash';
import createStore from './store-factory';

const store = createStore();
const createUuid = () => uniqueId('uuid-');

function findAndModify(key, uuid, consumerFn) {
  const events = store.get(key).map(
    event => event.uuid === uuid
      ? consumerFn(event)
      : event);

  store.set(key, events.filter(Boolean));
}

export function updateDescription(obj) {
  store.set('description',
    Object.assign({}, store.get('description'), obj));
}

export function createEvent(uuid = createUuid()) {
  const event = {
    uuid,
  };
  const events = store.get('events') || [];

  store.set('events', [event, ...events]);
}

export function updateEvent(uuid, obj) {
  findAndModify('events', uuid,
    event => Object.assign({}, event, obj));
}

export function createTalk(parentUuid, uuid = createUuid()) {
  const talk = {
    uuid,
    parentUuid,
  };
  const talks = store.get('talks') || [];

  store.set('talks', [talk, ...talks]);
}

export function updateTalk(uuid, obj) {
  findAndModify('talks', uuid,
    talk => Object.assign({}, talk, obj));
}

export function getTalks(parentUuid) {
  return (store.get('talks') || [])
      .filter(t => t.parentUuid === parentUuid);
}

export function removeTalk(uuid) {
  findAndModify('talks', uuid, () => null);
}

export default store;

