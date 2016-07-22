const dataSource = require('../service/data-source');
const store = require('../service/store');

const error = res =>
  err => {
    const statusCode = 500;
    const status = 'ERROR';

    res
      .status(statusCode)
      .json({ status, error: err });
  };

function github(req, res) {
  dataSource.github()
    .then(store.list)
    .catch(error(res))
    .then(() => res.json({ status: 'OK' }))
    .catch(error(res));
}

function twitter(req, res) {
  res.send({ params: req.params });
}

module.exports = { github, twitter };
