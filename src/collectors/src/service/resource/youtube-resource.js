const _ = require('lodash');
const fetch = require('node-fetch');
const co = require('co');
const { process } = require('global');
const { stringify } = require('querystring');
const HTTPErrors = require('http-errors');
const utils = require('../../utils');

const ACTIONS = {
  SEARCH: 'SEARCH',
  PLAYLIST_ITEMS: 'PLAYLISTITEMS',
  PLAYLISTS: 'PLAYLISTS',
  GET_CHANNEL_VIDEOS: 'GETCHANNELVIDEOS',
  VIDEOS: 'VIDEOS',
};

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

function search(props) {
  const query = Object.assign({}, props, { part: 'snippet' });
  return fetch(getUrl('search', query))
    .then(utils.handleFetchError);
}

function playlistItems(query) {
  return fetch(getUrl('playlistItems', query))
    .then(utils.handleFetchError);
}

function playlists(query) {
  return fetch(getUrl('playlists', query))
    .then(utils.handleFetchError);
}

function* fetchVideos({ channelId }) {
  const playlists = yield fetch(getUrl('playlists', { channelId }))
    .then(utils.handleFetchError);

  const videos = yield getVideosDetails(playlists.items);

  return videos.reduce((result, { items }) =>
    [].concat(
      result,
      items.filter(({ status }) => status.privacyStatus === PUBLIC_STATUS))
  , []);
}

function* videos(query) {
  return fetch(getUrl('videos', query))
    .then(utils.handleFetchError);
}

const handler = ({ query }) => {
  const { action } = query;
  const props = _.omit(query, ['action']);

  switch (action.toUpperCase()) {
    case ACTIONS.SEARCH:
      return search(props);

    case ACTIONS.PLAYLIST_ITEMS:
      return playlistItems(props);

    case ACTIONS.PLAYLISTS:
      return playlists(props);

    case ACTIONS.GET_CHANNEL_VIDEOS:
      return co.wrap(fetchVideos)(query);

    case ACTIONS.VIDEOS:
      return co.wrap(videos)(query);

    default:
      return Promise.reject(HTTPErrors.NotAcceptable());
  }
};

module.exports = handler;
