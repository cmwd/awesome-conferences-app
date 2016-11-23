const co = require('co-express');
const { conferenceModel } = require('model');

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

function conferenceController(proto) {
  const { router, bodyParser, httpError, response } = proto;
  const { tokenSecured, isAdmin } = proto.authentication;
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

  function* getConference(req, res, next, id) {
    req.conference = yield conferenceModel.findById(id);
    next(req.conference
      ? null
      : httpError(404, 'Conference does not exists'));
  }

  function* getConferences(req, res) {
    const { limit, offset, slugs, ids } = req.query;
    const query = conferenceModel.createQuery({ slugs, ids });
    const [conferences, count] = yield Promise.all([
      conferenceModel.find(query).skip(offset).limit(limit),
      conferenceModel.count(),
    ]);
    const info = { limit, offset, count };

    response(res, { info, conferences });
  }

  function* createConference(req, res) {
    yield conferenceModel.create(req.body);
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

  return router()
    .use(bodyParser.json())
    .param('conferenceId', co(getConference))
    .get('/', [prepareQueryParams, co(getConferences)])
    .post('/', [authenticationCheck, co(createConference)])
    .put('/:conferenceId', [authenticationCheck, co(updateConference)])
    .delete('/:conferenceId', [authenticationCheck, co(removeConference)]);
}

module.exports = conferenceController;
