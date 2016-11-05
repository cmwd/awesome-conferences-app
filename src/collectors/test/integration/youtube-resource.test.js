const resource = require('service/resource/youtube-resource');
const { assert } = require('chai');

suite('Youtube Resource Service - @youtube-resource-service', () => {
  suite('Action: video', () => {
    test('Should respond with video details', function* () {
      const query = { action: 'video_details' };
      const body = { videoId: 'dQw4w9WgXcQ' };
      const video = yield resource({ query, body });

      assert.isObject(video);
      assert.equal(video.videoId, 'dQw4w9WgXcQ');
      assert.equal(video.title, 'Rick Astley - Never Gonna Give You Up');
      assert.isAbove(video.description.length, 0);
      assert.property(video.thumbnail, 'url');
      assert.property(video.thumbnail, 'width');
      assert.property(video.thumbnail, 'height');
      assert.property(video, 'publishDate');
      assert.property(video, 'other');
    });
  });
});
