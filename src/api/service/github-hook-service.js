const RepositoryFileService = require('./repository-file-service');

const { FILE_STATE } = RepositoryFileService;

function createFileObject(state, filePath, payload) {
  const { full_name, default_branch } = payload.repository;
  const {
    timestamp,
    author,
    url: commitUrl,
    id: commitId,
  } = payload.head_commit;
  const fileUrl =
    `https://raw.github.com/${full_name}/${default_branch}/${filePath}`;

  return { state, fileUrl, filePath, timestamp, author, commitUrl, commitId };
}

function GithubHookService(payload, opts = {}) {
  const { added, removed, modified } = payload.head_commit;
  const {
    repositoryFile = RepositoryFileService,
  } = opts;
  const files = [
    ...added.map(file =>
      createFileObject(FILE_STATE.CREATED, file, payload)),
    ...modified.map(file =>
      createFileObject(FILE_STATE.MODIFIED, file, payload)),
    ...removed.map(file =>
      createFileObject(FILE_STATE.REMOVED, file, payload)),
  ].map(repositoryFile);

  function getFilesContent() {
    return Promise.all(files.map(f => f.getContent()));
  }

  return {
    get(filterFn = () => true) {
      return files.filter(filterFn);
    },
    fetchFilesContent(filterFn) {
      return getFilesContent(this.get(filterFn))
        .then(() => this);
    },
  };
}

module.exports = GithubHookService;

