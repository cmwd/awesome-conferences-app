const { Conference } = require('../model/index');
const error = err => { throw new Error(err); };

const homeController = {
  index(req, res) {
    Conference
      .find({})
      .catch(err => res.status(500).send(err))
      .then(data => res.send(JSON.stringify(data, null, 4)))
      .catch(error);
  },
};

module.exports = homeController;
