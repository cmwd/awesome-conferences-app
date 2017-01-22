const { Router } = require('express');
const co = require('co-express');
const bodyParser = require('body-parser');
const GithubHookService = require('../service/github-hook-service');
const { selector } = require('../service/repository-file-service');
const ConferenceModel = require('../model/conference-model');

function* index(req, res) {
  const files = yield GithubHookService(req.body)
    .fetchFilesContent(selector.toProcess);

  yield ConferenceModel.updateFiles(files.get(selector.updated));
  yield ConferenceModel.createFiles(files.get(selector.created));
  yield ConferenceModel.removeFiles(files.get(selector.removed));

  res.json({});
}

module.exports = Router()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .post('/', co(index));

