const collector = require('../service/collector');

function awesomeList(req, res) {
  collector
    .awesomeList()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

module.exports = { awesomeList };
