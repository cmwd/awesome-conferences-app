const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('assert');
const { ServiceUnavailable } = require('http-errors');
const { COLLECTORS_ADDRESS } = require('config');
require('sinon-as-promised');

suite('Collectors Service', () => {
  let fetch = null;
  const prepare = () => proxyquire('service/collectors', {
    'node-fetch': fetch,
  });

  suite('getVideoDetails', () => {
    test('Should call collectors resources', () => {
      fetch = sinon.stub().resolves({ json: () => Promise.resolve() });
      const { getVideoDetails } = prepare();
      const videoIds = ['one', 'two'];

      getVideoDetails({ resourceName: 'test', videoIds });
      sinon.assert.calledWith(fetch,
        `${COLLECTORS_ADDRESS}/resource/test/?action=videos`,
        {
          body: '{"videoIds":["one","two"]}',
          method: 'POST',
          timeout: 3e4,
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });

    test('Should return ServiceUnavailable', (done) => {
      fetch = sinon
        .stub()
        .resolves({ json: () => Promise.reject({ code: 'ENOTFOUND' }) });
      const { getVideoDetails } = prepare();

      /**
       * @todo Find propper way to handle promise errors
       */
      getVideoDetails({ resourceName: '', videoIds: [] })
        .catch((err) => {
          done(assert.ok(err instanceof ServiceUnavailable));
        });
    });
  });
});
