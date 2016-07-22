const test = require('tape');
const { resolve: pathResolve } = require('path-alias');
const proxyquire = require('proxyquire');
const {
  TEST_CASE_1,
  TEST_CASE_1_RESULT,
} = require(pathResolve('@resources/awesome-conferences-github-repo.js'));

const fetchStub = () =>
  Promise.resolve({
    text: () => Promise.resolve(TEST_CASE_1) });

const loadModule = () =>
  proxyquire(
    pathResolve('@server/services/data-sources/markup-document'),
    { 'node-fetch': fetchStub }
  );

test('Creates proper data structures', t => {
  const markupDocument = loadModule();
  t.plan(4);

  markupDocument()
    .catch(t.fail)
    .then((data) => {
      t.ok(data.length === TEST_CASE_1_RESULT.length, 'same length');
      t.deepEqual(data, TEST_CASE_1_RESULT, 'equals');
    });

  markupDocument()
    .catch(t.fail)
    .then((data) => {
      t.ok(data.length === TEST_CASE_1_RESULT.length, 'same length');
      t.deepEqual(data, TEST_CASE_1_RESULT, 'equals');
    });
});
