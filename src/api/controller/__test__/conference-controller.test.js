/* eslint-env jest */

const co = require('co');
const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const ConferenceController = require('../conference-controller');
const ConferenceModel = require('../../model/conference-model');
const { DB_ADDRESS } = require('config');

mongoose.Promise = global.Promise;

let app;

function setupSuite(done) {
  mongoose.connection.on('connected', done);
  mongoose.connect(`${DB_ADDRESS}/test`);
}

function teardownSuite(done) {
  const cleanup = Object
    .keys(mongoose.connection.collections)
    .map(collection =>
      new Promise((resolve) => {
        mongoose.connection.collections[collection].drop(resolve);
      }));

  mongoose.connection.on('disconnected', done);
  Promise.all(cleanup).then(() => mongoose.disconnect());
}

function setup() {
  app = express()
    .use(ConferenceController);
}

function teardown() {
  return ConferenceModel.remove({});
}

describe('Conference controller', () => {
  beforeAll(setupSuite);
  afterAll(teardownSuite);
  beforeEach(setup);
  afterEach(teardown);

  it('Should return array of conferences', co.wrap(function* () {
    yield ConferenceModel.create({
      filePath: 'test',
    });

    return request(app)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.items).toHaveLength(1);
      });
  }));

  it('Should return model for given path', co.wrap(function* () {
    yield ConferenceModel.create({
      filePath: 'my-file.md',
    });

    return request(app)
      .get('/my-file.md')
      .expect(200)
      .expect(({ body }) => {
        expect(body.filePath).toBe('my-file.md');
      });
  }));
});

