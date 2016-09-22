import { stringify } from 'querystring';
import fetch from '../utils/fetch';

export function getConferences(host) {
  return ({ limit = 20, offset = 0 }) =>
    fetch(`${host}/conference?${stringify({ limit, offset })}`)
      .then(response => response.json());
}
