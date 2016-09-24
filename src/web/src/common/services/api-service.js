import { stringify } from 'querystring';
import fetch from '../utils/fetch';

export const getConferences = host =>
  ({ limit = 20, offset = 0 }) =>
    fetch(`${host}/conference?${stringify({ limit, offset })}`)
      .then(response => response.json());

export const getConferenceDetails = host =>
  ({ conferenceId }) =>
    fetch(`${host}/conference/${conferenceId}`)
      .then(response => response.json());
