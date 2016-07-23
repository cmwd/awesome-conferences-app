const { resolve: pathResolve } = require('path-alias');
const collector = require('./service/collector');
const store = require('./service/store');
const {
  C_COLLECT,
  S_GITHUB,
  S_TWITTER,
} = require(pathResolve('@root/ms-constants'));

const success = (req, res) =>
  () => {
    const status = 'OK';

    res.json({ status });
  };

const error = res =>
  err => {
    const status = 'ERROR';

    res(null, { status, error: err });
  };

function handlers() {
  this.add({ cmd: C_COLLECT, service: S_GITHUB }, (msg, res) => {
    collector
      .then(store.list)
      .catch(error(res))
      .then(success(res))
      .catch(error(res));
  });

  this.add({ cmd: C_COLLECT, service: S_TWITTER }, (msg, res) => {
    const { twitterScreenName } = msg.params;

    collector
      .twitter({ twitterScreenName })
      .then(result => store.twitter({ twitterScreenName, result }))
      .catch(error(res))
      .then(success(res))
      .catch(error(res));
  });
}

module.exports = handlers;
