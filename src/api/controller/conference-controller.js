const co = require('co-express');
const httpError = require('http-errors');
const bodyParser = require('body-parser');
const { ConferenceModel } = require('model');

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

function ConferenceController({ authentication, app, response, param }) {
  const { tokenSecured, isAdmin } = authentication;
  const authenticationCheck = [tokenSecured, isAdmin];

  function prepareQueryParams(req, res, next) {
    const { limit, offset, ids, slugs } = req.query;

    Object.assign(req.query, {
      limit: parseInt(limit, 10) || DEFAULT_LIMIT,
      offset: parseInt(offset, 10) || DEFAULT_OFFSET,
      slugs: (slugs && slugs.split(',')) || null,
      ids: (ids && ids.split(',')) || null,
    });

    next();
  };

  function* getConferences(req, res) {
    const { limit, offset, slugs, ids } = req.query;
    const query = ConferenceModel.createQuery({ slugs, ids });
    const [conferences, count] = yield Promise.all([
      ConferenceModel.find(query).skip(offset).limit(limit),
      ConferenceModel.count(),
    ]);
    const info = { limit, offset, count };

    response(res, { info, conferences });
  }

  function* createConference(req, res) {
    yield ConferenceModel.create(req.body);
    response(res);
  }

  function* updateConference(req, res) {
    yield req.conference.update(req.body);
    response(res);
  }

  function* removeConference(req, res) {
    yield req.conference.remove();
    response(res);
  }
  
  return app
    .use(bodyParser.json())
    .param('conferenceId', param.conferenceId)
    .get('/', [prepareQueryParams, co(getConferences)])
    .post('/', [authenticationCheck, co(createConference)])
    .put('/:conferenceId', [authenticationCheck, co(updateConference)])
    .delete('/:conferenceId', [authenticationCheck, co(removeConference)]);
}

module.exports = ConferenceController;
