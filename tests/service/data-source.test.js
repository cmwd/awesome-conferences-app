const test = require('tape');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const { resolve: pathResolve } = require('path-alias');

const stub = {
  'node-fetch': sinon.stub().returns(Promise.resolve()),
};
const dataSource = proxyquire(pathResolve('@service/data-source'), stub);

test('Github data source', (t) => {
  t.plan(1);
  dataSource.github();
  t.ok(stub['node-fetch'].calledOnce);
});
