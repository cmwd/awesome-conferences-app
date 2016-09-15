const tape = require('tape');
const request = require('supertest');
const proxyquire = require('proxyquire');
const alias = require('path-alias');
const express = require('express');
const sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');
const mongoose = require('mongoose');
const { conferenceModel } = require(
  alias.resolve('@model/conference-model'));

mongoose.Promise = Promise;

const TIMEOUT_VALUE = 5000;
const setUp = ({ conferenceModelMock }) => {
  const stub = {
    '../model/index': { conferenceModel: conferenceModelMock },
  };
  const conferenceController = proxyquire(
    alias.resolve('@controller/conference-controller'), stub);

  return express().use(conferenceController);
};
const result = [...Array(20).keys()];
const applyChain = ({
  limit = sinon.match.number,
  offset = sinon.match.number,
}) =>
  mock => {
    mock.expects('find')
      .chain('skip')
      .withArgs(offset)
      .chain('limit')
      .withArgs(limit)
      .returns(result);
    mock.expects('count')
      .returns(10);
  };

tape('Conference Controller', t => {
  t.timeoutAfter(TIMEOUT_VALUE);
  t.plan(3);

  t.test('GET /conference', (nn) => {
    const mock = sinon.mock(conferenceModel);

    nn.plan(1);
    applyChain({})(mock);
    request(setUp({ conferenceModelMock: conferenceModel }))
      .get('/')
      .expect(200)
      .end(() => {
        nn.ok(mock.verify());
        mock.restore();
      });
  });

  t.test('GET /conference?limit=5&offset=5', (nn) => {
    const mock = sinon.mock(conferenceModel);

    nn.plan(1);
    applyChain({ limit: 5, offset: 5 })(mock);
    request(setUp({ conferenceModelMock: conferenceModel }))
      .get('/?limit=5&offset=5')
      .expect(200)
      .end(() => {
        nn.ok(mock.verify());
        mock.restore();
      });
  });

  t.test('GET /conference/1234', nn => {
    const mock = sinon.mock(conferenceModel);

    mock.expects('findOne')
      .withArgs({ _id: '1234' })
      .returns({});
    nn.plan(1);

    request(setUp({ conferenceModelMock: conferenceModel }))
      .get('/1234')
      .expect(200)
      .end(() => {
        nn.ok(mock.verify());
        mock.restore();
      });
  });
});
