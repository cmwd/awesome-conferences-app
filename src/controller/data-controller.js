const dataSource = require('../service/data-source');

function github(req, res) {
  dataSource.github()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
}

module.exports = { github };
