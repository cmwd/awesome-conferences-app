const express = require('express');
const request = require('supertest');
const GithubIntegrationController =
  require('../github-integration-controller');

let app;

const setup = () => {
  app = express()
    .use(GithubIntegrationController);
};

describe('Github Integration Controller', () => {
  beforeEach(setup);

  it.skip('Should return status ok', () =>
    request(app).post('/').expect(200));
});

