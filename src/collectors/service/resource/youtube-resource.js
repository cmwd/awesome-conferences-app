const _ = require('lodash');
const fetch = require('node-fetch');
const co = require('co');
const { process } = require('global');
const { stringify } = require('querystring');
const HTTPErrors = require('http-errors');

const ACTIONS = {
  VIDEOS: 'VIDEOS',
};

const Y_URL = 'https://www.googleapis.com/youtube/v3/';
const DEFAULT_PARAMS = {
  key: process.env.YOUTUBE_APP_KEY,
  part: 'snippet,id,status',
  order: 'date',
  maxResults: 50,
};

const getUrl = (method, params) =>
  `${Y_URL}${method}?${stringify(Object.assign({}, DEFAULT_PARAMS, params))}`;

function* videos(query, body) {
  const items = yield Promise.all(
    _.chunk(body.videoIds, 50)
      .map(id => fetch(getUrl('videos', { id: id.join(',') }))
        .then(response => response.json())));

  return items
    .reduce((result, response) =>
      result.concat(response.items), [])
    .filter(({ status }) =>
      status.privacyStatus === 'public')
    .map(({ id: videoId, kind, snippet }) =>
      Object.assign({}, snippet, { videoId, kind }));
}

const handler = ({ query, body }) => {
  const { action } = query;
  const props = _.omit(query, ['action']);

  switch (action.toUpperCase()) {
    case ACTIONS.VIDEOS:
      return co.wrap(videos)(props, body);

    default:
      return Promise.reject(HTTPErrors.NotAcceptable());
  }
};

module.exports = handler;
