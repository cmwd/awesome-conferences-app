const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const app = require('server');
const { generateToken } = require('util/crypto/jwt');
const { conferenceModel, videoModel } = require('model');
const collectors = require('service/collectors');
require('sinon-as-promised');

const createUserToken = (userInfo = {}) => generateToken(userInfo);

suite('Video Controller - @video-controller', () => {
  teardown(function* () {
    yield videoModel.remove({});
    yield conferenceModel.remove({});
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
      const conference = yield conferenceModel.create({ name: 'test' });
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

  suite('POST /video/:conferenceId', () => {
    test('Should fail authorization if user token is not provided', () =>
      supertest(app)
        .post('/video/57fe482de5f4f8475949c204')
        .expect(401)
      );

    test('Should fail authorization if user is not admin', () =>
      supertest(app)
        .post('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: false })}`)
        .expect(401)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
      );

    test('Should fail if conferenceId does not exists', () =>
      supertest(app)
        .post('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .expect(400)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
    );

    test('Should accept JSON body', function* () {
      const conference = yield conferenceModel.create({ name: 'test' });

      sinon.stub(collectors, 'getVideoDetails')
        .resolves({ videoId: 'ny3hScFgCIQ', title: 'test' });

      return supertest(app)
        .post(`/video/${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(200)
        .then(() => collectors.getVideoDetails.restore());
    });

    test('Should accept form body', function* () {
      const conference = yield conferenceModel.create({ name: 'test' });
      sinon.stub(collectors, 'getVideoDetails')
        .resolves({ videoId: 'ny3hScFgCIQ', title: 'test' });

      return supertest(app)
        .post(`/video/${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('form')
        .send('resourceName=YOUTUBE')
        .send('videoId=ny3hScFgCIQ')
        .expect(200)
        .then(() => collectors.getVideoDetails.restore());
    });

    test('Should get video details from collectors', function* () {
      const conference = yield conferenceModel.create({ name: 'test' });
      sinon.stub(collectors, 'getVideoDetails')
        .resolves({ videoId: 'ny3hScFgCIQ', title: 'test' });

      return supertest(app)
        .post(`/video/${conference.id}`)
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
          collectors.getVideoDetails.restore();
        });
    });

    test('Should fail if video already exists', function* () {
      const conference = yield conferenceModel.create({ name: 'test' });

      sinon.stub(collectors, 'getVideoDetails')
        .resolves({ videoId: 'ny3hScFgCIQ', title: 'test' });

      yield supertest(app)
        .post(`/video/${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(200);

      return supertest(app)
        .post(`/video/${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: 'ny3hScFgCIQ' })
        .expect(409)
        .then(() => collectors.getVideoDetails.restore());
    });

    test('Should fail with 400 code if input data is incorrect', function* () {
      const conference = yield conferenceModel.create({ name: 'test' });
      return supertest(app)
        .post(`/video/${conference.id}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoId: {} })
        .expect(400);
    });
  });

  suite('DELETE /video/:conferenceId', () => {
    setup(() => videoModel.create({
      resourceName: 'resourceName',
      conferenceId: '57fe482de5f4f8475949c204',
      videoId: '1234',
      title: 'test',
    }));

    test('Should fail authorization if user token is not provided', () =>
      supertest(app)
        .delete('/video/57fe482de5f4f8475949c204')
        .expect(401)
        .expect(({ body }) =>
          assert.isNotOk(body.status.ok))
    );

    test('Should fail authorization if user is not admin', () =>
      supertest(app)
        .delete('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: false })}`)
        .expect(401)
        .expect(({ body }) => assert.isNotOk(body.status.ok))
    );

    test('Should fail if video does not exists', () =>
      supertest(app)
        .delete('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ videoId: '123' })
        .expect(404)
        .expect(({ body }) =>
          assert.isNotOk(body.status.ok))
      );

    test('Should accept JSON body', function* () {
      yield supertest(app)
        .delete('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ videoId: '1234' })
        .expect(200)
        .expect(({ body }) =>
          assert.isOk(body.status.ok));
      const video = yield videoModel.findOne({ videoId: '123' });

      assert.isNull(video);
    });

    test('Shoudl accept form body', function* () {
      yield supertest(app)
        .delete('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('form')
        .send('videoId=1234')
        .expect(200)
        .expect(({ body }) =>
          assert.isOk(body.status.ok));
      const video = yield videoModel.findOne({ videoId: '123' });

      assert.isNull(video);
    });
  });
});
