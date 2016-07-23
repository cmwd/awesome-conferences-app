const collector = require('../service/collector');
const store = require('../service/store');

const error = (reg, res) =>
  err => {
    const statusCode = 500;
    const status = 'ERROR';

    res
      .status(statusCode)
      .json({ status, error: err });
  };

const success = (req, res) =>
  () => {
    const status = 'OK';

    res.json({ status });
  };

function github(req, res) {
  collector
    .github()
    .then(store.list)
    .catch(error(req, res))
    .then(success(req, res))
    .catch(error(req, res));
}

function twitter(req, res) {
  const { twitterScreenName } = req.params;

  collector
    .twitter({ twitterScreenName })
    .then(result => store.twitter({ twitterScreenName, result }))
    .catch(error(req, res))
    .then(success(req, res))
    .catch(error(req, res));
}

module.exports = { github, twitter };
