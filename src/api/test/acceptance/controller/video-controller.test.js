const supertest = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const app = require('server');
const { videoIds, youtubeVideoDetails } = require('test/data/video-data');
const { generateToken } = require('util/crypto/jwt');
const { conferenceModel, videoModel } = require('model');
const collectors = require('service/collectors');

require('sinon-as-promised');

const createUserToken = (userInfo = {}) => generateToken(userInfo);

suite('Video Controller', () => {
  let conferenceId = null;

  suite('GET /video/', () => {
    test('Should return status ok and array of videos', () =>
        supertest(app)
          .get('/video/')
          .expect(200)
          .expect(({ body }) => {
            assert.ok(body.status.ok,
              'Should return true if request has succeed');
            assert.ok(Array.isArray(body.videos),
              'Incorrect data type');
          })
    );
  });

  suite('PUT /video/:conferenceId', () => {
    test('Should fail authorization if user token is not provided', () =>
      supertest(app)
        .put('/video/57fe482de5f4f8475949c204')
        .expect(401)
      );

    test('Should fail authorization if user is not admin', () =>
      supertest(app)
        .put('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: false })}`)
        .expect(401)
        .expect(({ body }) =>
          assert.ok(!body.status.ok,
            'Should return false if request has failed'))
      );

    test('Should fail if conferenceId does not exists', () =>
      supertest(app)
        .put('/video/57fe482de5f4f8475949c204')
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .expect(400)
        .expect(({ body }) =>
          assert.ok(!body.status.ok,
            'Should return false if request has failed'))
    );

    test('Should accept JSON body', function* () {
      const { _id: id } = yield conferenceModel.create({ name: 'test' });

      conferenceId = id.toString();
      sinon.stub(collectors, 'getVideoDetails')
        .resolves(youtubeVideoDetails);

      return supertest(app)
        .put(`/video/${conferenceId}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoIds })
        .expect(200)
        .then(() => { collectors.getVideoDetails.restore(); });
    });

    test('Should accept application/x-www-form-urlencoded body', () => {
      sinon.stub(collectors, 'getVideoDetails')
        .resolves(youtubeVideoDetails);

      return supertest(app)
        .put(`/video/${conferenceId}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .send('resourceName=YOUTUBE')
        .send(`videoIds[]=${videoIds.join('&videoIds[]=')}`)
        .expect(200)
        .then(() => { collectors.getVideoDetails.restore(); });
    });

    test('Should fail with 400 code if input data is incorrect', () =>
      supertest(app)
        .put(`/video/${conferenceId}`)
        .set('Authorization', `Bearer ${createUserToken({ admin: true })}`)
        .type('json')
        .send({ resourceName: 'YOUTUBE', videoIds: [{}, {}] })
        .expect(400)
    );
  });

  suite('GET /video/:conferenceId', () => {
    teardown(() => Promise.all([
      videoModel.remove({}),
      conferenceModel.remove({}),
    ]));

    test('Should return videos for conferenceId', () =>
      supertest(app)
        .get(`/video/${conferenceId}`)
        .expect(200)
        .expect(({ body }) => {
          assert.ok(body.status.ok, 'Invalid status');
          assert.ok(Array.isArray(body.videos), 'Invalid data type');
          assert.ok(
            body.videos.every(vid =>
              vid.conferenceId === conferenceId), 'Invalid parent ID');
        })
      );
  });
});
