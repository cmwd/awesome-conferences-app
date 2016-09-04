import { stringify } from 'querystring';

export const getConferences = fetch =>
  host =>
    ({ limit = 20, offset = 0 }) =>
      fetch(`${host}/conferences?${stringify({ limit, offset })}`)
        .then(response => response.json());
