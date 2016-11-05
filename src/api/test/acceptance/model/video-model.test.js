const { assert } = require('chai');
const { videoModel } = require('model');

suite('Video Model - @video-model', () => {
  const resourceName = 'YOUTUBE';
  const conferenceId = '57fe482de5f4f8475949c204';

  test('Should throw ValidationError', function* () {
    try {
      yield videoModel.create({ resourceName, conferenceId });
    } catch (e) {
      assert.equal(e.name, 'ValidationError');
    }

    try {
      yield videoModel.create({ resourceName, conferenceId, videoId: 1 });
    } catch (e) {
      assert.equal(e.name, 'ValidationError');
    }

    const video = yield videoModel.findOne({ conferenceId });
    yield videoModel.remove({});

    assert.isNull(video);
  });
});
