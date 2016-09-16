import { stringify } from 'querystring';

export default fetch => {
  const getConferences = host =>
    ({ limit = 20, offset = 0 }) =>
      fetch(`${host}/conference?${stringify({ limit, offset })}`)
        .then(response => response.json());

  return { getConferences };
};
