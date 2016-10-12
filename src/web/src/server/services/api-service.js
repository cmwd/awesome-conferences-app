import fetch from 'node-fetch';

const HTTP_POST = 'POST';

export const authenticateWithService = host =>
  ({ token, service }) =>
    fetch(
      `${host}/authenticate/${service.toLowerCase()}`,
      { method: HTTP_POST,
        body: '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then(response => response.json());
