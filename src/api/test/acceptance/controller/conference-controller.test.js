const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const app = require('server');
const { conferenceModel } = require('model');
require('sinon-as-promised');

const genLetters = (startLetter, endLetter) => {
  const start = startLetter.charCodeAt(0);
  const end = endLetter.charCodeAt(0);

  return Array.from(
    { length: end - start + 1 },
    (a, index) =>
      String.fromCharCode(start + index));
}

suite('Conference Controller - @conference-controller', () => {
  let conferences = null;

  setup(function* () {
    conferences = yield conferenceModel
      .insertMany(
        genLetters("a", "z").map(name => ({ name })));
  });

  teardown(() => {
    return conferenceModel.remove({});
  });

  suite('GET /conference/', () => {
    test('should return array of the conferences', () =>
      supertest(app)
        .get('/conference/')
        .expect(200)
        .expect(({ body }) => {
          assert.isOk(body.status.ok);
          assert.isArray(body.conferences);
          assert.lengthOf(body.conferences, 20);
          assert.isObject(body.info);
          assert.equal(body.info.offset, 0);
          assert.equal(body.info.limit, 20);
          assert.equal(body.info.count, 26)
        }));

    test('GET /conference?limit=<Number>', () =>
      supertest(app)
        .get('/conference?limit=5')
        .expect(200)
        .expect(({ body }) => {
          assert.lengthOf(body.conferences, 5);
          assert.equal(body.info.limit, 5);
          assert.equal(body.conferences[0].name, 'a');
          assert.equal(body.conferences[4].name, 'e');
        }));

    test('GET /conference?offset=<Number>', () =>
      supertest(app)
        .get('/conference?offset=5')
        .expect(200)
        .expect(({ body }) => {
          assert.isOk(body.status.ok);
          assert.equal(body.info.offset, 5);
          assert.equal(body.conferences[0].name, 'f');
          assert.equal(body.conferences[4].name, 'j');
        }));

    suite('GET /conference?id=<ObjectIds>', () => {
      test('returns requested conference by id', () =>
        supertest(app)
          .get(`/conference?id=${conferences[0].id}`)
          .expect(200)
          .expect(({ body }) => {
            assert.isOk(body.status.ok);
            assert.isArray(body.conferences);
            assert.lengthOf(body.conferences, 1);
            assert.equal(body.conferences[0].name, 'a');
          }));

      test('returns multiple conferences by id', () =>
        supertest(app)
          .get(`/conference?id=${[
            conferences[0].id,
            conferences[1].id,
            conferences[2].id
          ].join(',')}`)
          .expect(200)
          .expect(({ body }) => {
            assert.isOk(body.status.ok);
            assert.isArray(body.conferences);
            assert.lengthOf(body.conferences, 3);
          }));
    })

    suite('GET /conference?slug=<Strings>', () => {
      test('returns requested conference by slug', () =>
        supertest(app)
          .get('/conference?slug=a')
          .expect(200)
          .expect(({ body }) => {
            assert.isOk(body.status.ok);
            assert.isArray(body.conferences);
            assert.lengthOf(body.conferences, 1);
            assert.equal(body.conferences[0].name, 'a');
          }));

      test('returns multiple conferences by slug', () =>
        supertest(app)
          .get('/conference?slug=a,b,c')
          .expect(200)
          .expect(({ body }) => {
            assert.isOk(body.status.ok);
            assert.isArray(body.conferences);
            assert.equal(body.conferences[0].name, 'a');
            assert.lengthOf(body.conferences, 3);
            assert.equal(body.conferences[2].name, 'c');
          }))
    });
  });

  suite('GET /conference/:conferenceId', function* () {
    const conference = yield conferenceModel.create({ name: 'x' });

    return supertest(app)
      .get(`/conference/${conference.id}`)
      .expect(200)
      .expect(({ body }) => {
        assert.isOk(body.status.ok);
        assert.isObject(body.conference);
        assert.equal(body.conference.name, x.name);
      })
  });

  suite('POST /conference/', () => {
    test('should return error if request is not authenticated', () =>
      supertest(app)
        .post('/conference/')
        .expect(401));

    test('should create new conference', function* () {
      yield supertest(app)
        .post('/conference/')
        .send({ name: 'Conference Name'})
        .expect(200)
        .expect(({ body }) => {
          assert.isOk(body.status.ok);
        });

      const conference = yield conferenceModel.find({ name: 'Conference Name'});

      assert.isObject(conference[0]);
    });
  });

  suite('UPDATE /conference/:conferenceId', () => {
    test('should return error if request is not authenticated', () =>
      supertest(app)
        .put('/conference/1234')
        .expect(401));

    test('should fail if conference does not exists', () =>
      supertest(app)
        .put('/conference/1234')
        .expect(400));

    test('should update existing confrence', function* () {
      let conference = yield conferenceModel.create({ name: 'Wrong name :/'});

      yield supertest(app)
        .put(`/conference/${conference.id}`)
        .send({ name: 'This is correct name'})
        .expect(200);
      conference = yield conferenceModel.findOne(conference.id);
      assert.equal(conference.name, 'This is correct name');
    });
  });

  suite('DELETE /conference/:conferenceId', () => {
    test('should return error if request is not authenticated', () =>
      supertest(app)
        .del('/conference/')
        .expect(401));
  });
});
