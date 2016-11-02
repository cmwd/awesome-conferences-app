const proxyquire = require('proxyquire');
const sinon = require('sinon');
const youtubeResponse = require('test/data/youtube-videos');
require('sinon-as-promised');

suite('Youtube Resource Service', () => {
  suite('Action: video', () => {
    test('Should create response to the Youtube API', () => {
      const fetch = sinon
        .stub()
        .resolves({ json: () =>
          Promise.resolve(youtubeResponse) });
      const youtubeResource = proxyquire('service/resource/youtube-resource', {
        'node-fetch': fetch,
        global: {
          process: {
            env: {
              YOUTUBE_APP_KEY: 'test',
            },
          },
        },
      });
      const query = { action: 'videos' };
      const body = { videoIds: ['one', 'two', 'three'] };

      youtubeResource({ query, body });
      sinon.assert.calledWith(fetch,
        // eslint-disable-next-line max-len
        'https://www.googleapis.com/youtube/v3/videos?key=test&part=snippet%2Cid%2Cstatus&order=date&maxResults=50&id=one%2Ctwo%2Cthree'
      );
    });

    test('Should ask for max 50 items', () => {
      const fetch = sinon
        .stub()
        .resolves({ json: () =>
          Promise.resolve(youtubeResponse) });
      const youtubeResource = proxyquire('service/resource/youtube-resource', {
        'node-fetch': fetch,
      });
      const query = { action: 'videos' };
      const body = {
        videoIds: Array.from({ length: 110 }, (i, index) =>
          `item-${index + 1}`),
      };

      youtubeResource({ query, body });
      sinon.assert.calledThrice(fetch);
    });
  });
});
