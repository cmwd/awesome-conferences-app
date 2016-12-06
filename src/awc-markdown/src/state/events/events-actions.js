import { validate } from './events-utils';
import {
  CREATE_EVENT,
  DESTROY_EVENT,
  UPDATE_EVENT_DESCRIPTION,
  CREATE_EVENT_TALK,
  DESTROY_EVENT_TALK,
  UPDATE_EVENT_TALK
} from '../action-types';

export const createEvent = (payload = {}) => ({
  type: CREATE_EVENT,
  payload
});

export const destroyEvent = uuid => {
  const type = DESTROY_EVENT;
  validate.uuid(uuid);

  return { type, uuid };
};

export const updateEventDescription = (uuid, payload) => {
  const type = UPDATE_EVENT_DESCRIPTION;
  validate.uuid(uuid);

  return { type, uuid, payload };
};

export const createTalk = (uuid, payload) => {
  const type = CREATE_EVENT_TALK;
  validate.uuid(uuid);

  return { type, uuid, payload };
}

export const destroyTalk = uuid => {
  const type = DESTROY_EVENT_TALK;
  validate.uuid(uuid);

  return { type, uuid };
}

export const updateTalk = (uuid, payload) => {
  const type = UPDATE_EVENT_TALK;
  validate.uuid(uuid);

  return { type, uuid, payload };
};
