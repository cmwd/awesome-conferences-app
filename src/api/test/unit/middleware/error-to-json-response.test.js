const sinon = require('sinon');
const errorHandler = require('middleware/error-to-json-response');

const createReq = ({ env = 'production' } = {}) => ({
  log: {
    fatal: sinon.stub(),
  },
  id: 1,
});

const createRes = () => {
  const res = {};

  Object.assign(res, {
    status: sinon.stub().returns(res),
    json: sinon.stub().returns(res),
  });

  return res;
};

suite('Error to JSON response', () => {
  test('Shoul set default message if not present', () => {
    const res = createRes();

    errorHandler({ status: 500 }, createReq(), res);
    sinon.assert.calledWithMatch(res.json,
      sinon.match(({ status }) => status.message === 'Internal Server Error'));
    res.json.reset();
    errorHandler({ status: 400 }, createReq(), res);
    sinon.assert.calledWithMatch(res.json,
      sinon.match(({ status }) => status.message === 'Bad Request'));
    res.json.reset();
    errorHandler({ status: 400, message: 'Pies i kot' }, createReq(), res);
    sinon.assert.calledWithMatch(res.json,
      sinon.match(({ status }) => status.message === 'Pies i kot'));
  });

  test('Should send status ok equals false', () => {
    const res = createRes();

    errorHandler({ status: 418 }, createReq(), res);
    sinon.assert.calledWithMatch(res.json,
      sinon.match(({ status }) => !status.ok));
  });

  test('Should log fatal errors', () => {
    const req = createReq();

    try {
      throw new Error('Oopsie');
    } catch (err) {
      errorHandler(err, req, createRes());
    }

    sinon.assert.calledWithMatch(req.log.fatal, sinon.match.string);
  });
});
