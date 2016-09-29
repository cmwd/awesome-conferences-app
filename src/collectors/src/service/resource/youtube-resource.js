const fetch = require('node-fetch');
const co = require('co');
const { process } = require('global');
const { stringify } = require('querystring');
const utils = require('../../utils');

const Y_URL = 'https://www.googleapis.com/youtube/v3/';
const DEFAULT_PARAMS = {
  key: process.env.YOUTUBE_APP_KEY,
  part: 'snippet,id,status',
  order: 'date',
  maxResults: 50,
};
const PUBLIC_STATUS = 'public';

const getUrl = (method, params) =>
  `${Y_URL}${method}?${stringify(Object.assign({}, DEFAULT_PARAMS, params))}`;

const getVideosDetails = playlistItems =>
  Promise.all(
    playlistItems.map(({ id: playlistId }) =>
      fetch(getUrl('playlistItems', { playlistId }))
        .then(utils.handleFetchError)
    )
  );

function *fetchVideos({ channelId }) {
  const playlists = yield fetch(getUrl('playlists', { channelId }))
    .then(utils.handleFetchError);

  const videos = yield getVideosDetails(playlists.items);

  return videos.reduce((result, { items }) =>
    [].concat(
      result,
      items.filter(({ status }) => status.privacyStatus === PUBLIC_STATUS))
  , []);
}

const handler = ({ query }) => {
  if (!query.channelId) {
    return Promise.reject(new Error('Parameter channelId is required'));
  }

  return co.wrap(fetchVideos)(query);
};

module.exports = handler;
