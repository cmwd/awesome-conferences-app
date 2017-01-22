const nodeFetch = require('node-fetch');
const nodeYaml = require('node-yaml');

const FILE_STATE = {
  CREATED: 'added',
  MODIFIED: 'modified',
  REMOVED: 'removed',
};

const yamlParserOptions = {
  schema: nodeYaml.schema.defaultSafe,
};

const getFile = url =>
  nodeFetch(url).then(response => response.text());

const parseFile = content =>
  Promise.resolve(nodeYaml.parse(content, yamlParserOptions));

function RepositoryFileService(fileDescriptor, opts = {}) {
  const file = Object.assign({}, fileDescriptor);
  const {
    fetch = getFile,
    parser = parseFile,
  } = opts;

  const sanitize = rawFileContent =>
    rawFileContent.replace('```yaml', '').replace('```', '').trim();

  return {
    getContent() {
      return fetch(file.fileUrl)
        .then(sanitize)
        .then(parser)
        .then(fileContent => Object.assign(file, { fileContent }))
        .then(() => this);
    },
    get() {
      return file;
    },
  };
}

RepositoryFileService.FILE_STATE = FILE_STATE;
RepositoryFileService.selector = {
  toProcess({ get }) {
    const { state } = get();
    return state === FILE_STATE.CREATED || state === FILE_STATE.MODIFIED;
  },
  removed({ get }) {
    const { state } = get();
    return state === FILE_STATE.REMOVED;
  },
  updated({ get }) {
    const { state } = get();
    return state === FILE_STATE.MODIFIED;
  },
  created({ get }) {
    const { state } = get();
    return state === FILE_STATE.CREATED;
  },
};

module.exports = RepositoryFileService;

