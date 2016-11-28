const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const app = require('server');
const collectors = require('service/collectors');
const { generateToken } = require('util/crypto/jwt');
const { ConferenceModel, VideoModel } = require('model');
require('sinon-as-promised');

const createUserToken = (userInfo = {}) => generateToken(userInfo);

suite('Video Controller - @video-controller', () => {
  let conference;
  let video;

  const collectorsResponse = {
      title: 'Video Title',
      description: 'Video Description',
      publishDate: new Date(),
      thumbnail: {
        url: 'image_url',
        width: 200,
        height: 400,
      },
      other: {
        mixed: {
          type: true
        }
      }
  };

  setup(function* () {
    sinon
      .stub(collectors, 'getVideoDetails')
      .resolves(collectorsResponse);

    conference = yield ConferenceModel.create({ name: 'test' });
    video = yield VideoModel.create({
      resourceName: 'resourceName',
      conferenceId: conference.id,
      videoId: '1234',
      title: 'test',
    });
  });

  teardown(function* () {
    collectors.getVideoDetails.restore();
    yield VideoModel.remove({});
    yield ConferenceModel.remove({});
  });

  suite('GET /video/', () => {
    test('Should return status ok and array of videos', () =>
        supertest(app)
          .get('/video/')
          .expect(200)
          .expect(({ body }) => {
            assert.isOk(body.status.ok);
            assert.isArray(body.videos);
          })
    );
  });

  suite('GET /video/:conferenceId', () => {
    test('Should return videos for conferenceId', function* () {
      return supertest(app)
        .get(`/video/${conference.id}`)
        .expect(200)
        .expect(({ body }) => {
          assert.isOk(body.status.ok);
          assert.isArray(body.videos);
          assert.isOk(
            body.videos.every(vid =>
              vid.conferenceId === conference.id));
        });
    });
  });

  suite('POST /video?conferenceId=conferenceId', () => {
    test('Should fail authorization if user token is not provided', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .expect(401)
      );

    test('Should fail authorization if user is not admin', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .set('Authorization', `Bearer ${createUserToken({ admin: false })}`)
        .expect(401)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
      );

    test('Should fail if conferenceId does not exists', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .expect(400)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
    );

    test('Should accept JSON body', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(200));

    test('Should accept form body', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('form')
        .send('resourceName=YOUTUBE')
        .send('videoId=ny3hScFgCIQ')
        .expect(200));

    test('Should get video details from collectors', () =>
      supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('form')
        .send('resourceName=YOUTUBE')
        .send('videoId=ny3hScFgCIQ')
        .expect(200)
        .then(() => {
          sinon.assert.calledWith(collectors.getVideoDetails, {
            resourceName: 'YOUTUBE',
            videoId: 'ny3hScFgCIQ',
          });
        }));

    test('Should fail if video already exists', function* () {
      yield supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(200);

      return supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(409);
    });

    test('Should fail with 400 code if input data is incorrect', () => {
      return supertest(app)
        .post(`/video?conferenceId=${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: {} })
        .expect(400);
    });
  });

  suite('DELETE /video/:videoId', () => {

    test('Should fail authorization if user token is not provided', () =>
      supertest(app)
        .delete(`/video/${video.id}`)
        .expect(401)
        .expect(({ body }) =>
          assert.isNotOk(body.status.ok))
    );

    test('Should fail authorization if user is not admin', () =>
      supertest(app)
        .delete(`/video/${video.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: false })}`)
        .expect(401)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
    );

    test('Should fail if video does not exists', () =>
      supertest(app)
        .delete('/video/583aa556c78ac92ca0955eff')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .expect(404)
        .expect(({ body }) =>
          assert.isNotOk(body.status.ok))
      );

    test('Should remove video', () =>
      supertest(app)
        .delete(`/video/${video.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .expect(200)
        .expect(({ body }) =>
          assert.isOk(body.status.ok)));
  });
});
