const _ = require('lodash');
const fetch = require('node-fetch');
const co = require('co');
const { process } = require('global');
const { stringify } = require('querystring');
const HTTPErrors = require('http-errors');

const ACTIONS = {
  VIDEO_DETAILS: 'VIDEO_DETAILS',
};

const Y_URL = 'https://www.googleapis.com/youtube/v3/';
const DEFAULT_PARAMS = {
  key: process.env.YOUTUBE_APP_KEY,
  part: 'snippet,status',
  order: 'date',
  maxResults: 50,
};

const videoDetailsParser = ({ items: [details] }) => {
  const { snippet } = details;

  if (details.status.privacyStatus !== 'public') {
    throw new Error('Video is not public');
  }

  return {
    videoId: details.id,
    title: snippet.title,
    description: snippet.description,
    publishDate: snippet.publishedAt,
    thumbnail: snippet.thumbnails.default,
    other: snippet,
  };
};

const getUrl = (method, params) =>
  `${Y_URL}${method}?${stringify(Object.assign({}, DEFAULT_PARAMS, params))}`;

function* videos(query, body) {
  const details = yield fetch(getUrl('videos', { id: body.videoId }))
    .then(response => response.json())
    .then(videoDetailsParser);

  return details;
}

const handler = ({ query, body }) => {
  const { action } = query;
  const props = _.omit(query, ['action']);

  if (!process.env.YOUTUBE_APP_KEY) {
    throw new Error('Youtube API key is required');
  }

  switch (action.toUpperCase()) {
    case ACTIONS.VIDEO_DETAILS:
      return co.wrap(videos)(props, body);

    default:
      return Promise.reject(HTTPErrors.NotAcceptable());
  }
};

module.exports = handler;
