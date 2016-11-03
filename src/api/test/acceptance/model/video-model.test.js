const { assert } = require('chai');
const { videoModel } = require('model');

suite('Video Model - @video-model', () => {
  suite('setVideos', () => {
    const resourceName = 'YOUTUBE';
    const conferenceId = '57fe482de5f4f8475949c204';
    const testData = [
      { id: 1, videoName: 'one' },
      { id: 2, videoName: 'two' },
    ];

    test('Should validate provided videos', () => {
      assert.throws(() => {
        videoModel.setVideos('resourceName', 'conferenceId', { a: 'a' });
      }, TypeError);
    });

    test('Should save provided videos', function* () {
      yield videoModel.setVideos(resourceName, conferenceId, testData);
      const videos = yield videoModel.find({ resourceName, conferenceId });
      assert.lengthOf(videos, 2);

      yield videoModel.remove({});
    });

    test('Should update video if already exists', function* () {
      yield videoModel.setVideos(resourceName, conferenceId, testData);
      const modData = testData.slice(0);
      const newName = 'video new name';
      modData[1].videoName = newName;

      yield videoModel.setVideos(resourceName, conferenceId, testData);
      const video = yield videoModel
        .findOne({ resourceName, conferenceId, 'data.videoName': newName });
      assert.isNotNull(video);
      yield videoModel.remove({});
    });

    test('Should should remove remaining videos', function* () {
      yield videoModel.setVideos(resourceName, conferenceId, testData);
      yield videoModel.setVideos(resourceName, conferenceId, [testData[0]]);
      const video = yield videoModel
        .find({
          resourceName,
          conferenceId,
          'data.videoName': testData[1].videoName,
        });

      assert.lengthOf(video, 0);
      yield videoModel.remove({});
    });
  });
});
