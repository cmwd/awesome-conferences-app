const { ConferenceModel } = require('./model/index');

const notFound = () => new Error('Not found.');

const getConferenceId = (req, res, next, id) =>
  ConferenceModel.findById(id)
    .catch(next)
    .then(model => {
      if (!model) {
        next(notFound())
      } else {
        req.pocket.set('conferenceModel', model);
        next();
      }
    });


function routerParams(app) {
  app.param('conference_id', getConferenceId)
}

module.exports = { routerParams };
