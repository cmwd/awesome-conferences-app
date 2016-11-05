const proxyquire = require('proxyquire');
const sinon = require('sinon');
const { assert } = require('chai');
const { ServiceUnavailable } = require('http-errors');
const { COLLECTORS_ADDRESS } = require('config');
require('sinon-as-promised');

suite('Collectors Service - @collectors', () => {
  let fetch = null;
  const prepare = () => proxyquire('service/collectors', {
    'node-fetch': fetch,
  });

  suite('getVideoDetails', () => {
    test('Should call collectors resources', () => {
      fetch = sinon.stub().resolves({ json: () => Promise.resolve() });
      const { getVideoDetails } = prepare();
      const videoId = 'one';

      getVideoDetails({ resourceName: 'resourceName', videoId });
      sinon.assert.calledWith(fetch,
        `${COLLECTORS_ADDRESS}/resource/resourceName/?action=video_details`,
        {
          body: '{"videoId":"one"}',
          method: 'POST',
          timeout: 3e4,
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });

    test('Should throw ServiceUnavailable', function* () {
      fetch = sinon
        .stub()
        .resolves({ json: () => Promise.reject({ code: 'ENOTFOUND' }) });
      const { getVideoDetails } = prepare();
      let error = null;

      try {
        yield getVideoDetails({ resourceName: '', videoIds: [] });
      } catch (err) {
        error = err;
      }

      assert.instanceOf(error, ServiceUnavailable);
    });
  });
});
