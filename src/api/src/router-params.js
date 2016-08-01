const { ConferenceModel } = require('./model/index');

const getConferenceId = (req, res, next, id) =>
  ConferenceModel.findById(id)
    .catch(next)
    .then(model => {
      req.pocket.set('conferenceModel', model);
      next();
    });

function routerParams(app) {
  app.param('conference_id', getConferenceId);
}

module.exports = { routerParams };
