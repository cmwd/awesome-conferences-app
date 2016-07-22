const test = require('tape');
const { resolve: pathResolve } = require('path-alias');
const markdownParser = require(pathResolve('@parser/markdown-parser'));
const {
  TEST_CASE_1,
  TEST_CASE_1_RESULT,
} = require(pathResolve('@resources/awesome-conferences-github-repo.js'));

test('Should parse markup document to expected shape', (t) => {
  t.plan(1);
  t.deepEqual(markdownParser(TEST_CASE_1), TEST_CASE_1_RESULT);
});
