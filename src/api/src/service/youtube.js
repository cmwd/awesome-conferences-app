const fetch = require('node-fetch');
const { COLLECTORS_ADDRESS } = require('../../config');

module.exports = {
  getVideos({ channelId }) {
    return fetch(
      `${COLLECTORS_ADDRESS}/resource/youtube?channelId=${channelId}`)
        .then(response => response.json());
  },
};
