const fetch = require('node-fetch');
const { process } = require('global');
const { resourceFactory } = require('./resource-factory');

const Y_URL = 'https://www.googleapis.com/youtube/v3/search';
const { YOUTUBE_APP_KEY } = process.env;

const getUrl = ({ channelId }) =>
  `${Y_URL}?key=${YOUTUBE_APP_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`;

const methods = {
  getByChannelId({ channelId }) {
    if (!channelId) {
      return Promise.reject(new Error('Parameter channelId is required'));
    }

    return fetch(getUrl({ channelId }))
      .then(response => response.json());
  },
};

module.exports = resourceFactory(methods);
