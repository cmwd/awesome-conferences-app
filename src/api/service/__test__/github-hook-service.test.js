const GithubHookService = require('../github-hook-service');

let repositoryFileHandler;
let opts;
const payload = {
  repository: {
    full_name: 'my_test',
    default_branch: 'my_branch',
  },
  head_commit: {
    timestamp: 'timestamp',
    author: 'author',
    url: 'url',
    id: 'id',
    added: ['my-added-file.md'],
    modified: ['my-modified-file.md'],
    removed: ['my-removed-file.md'],
  },
};

const setup = () => {
  const repositoryHandlerImpl = props => ({
    get: () => props,
    getContent: jest.fn(() =>
      new Promise(resolve => setTimeout(resolve, 1000, 'file-content'))),
  });

  repositoryFileHandler = jest.fn(repositoryHandlerImpl);
  repositoryFileHandler.FILE_STATE = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };
  opts = { repositoryFile: repositoryFileHandler };
  jest.useFakeTimers();
};

const teardown = () => {
  jest.clearAllTimers();
  jest.useRealTimers();
};

describe('Github Service', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('Should return factory function', () => {
    const githubHook = GithubHookService(payload, opts);
    expect(typeof githubHook === 'object').toBeTruthy();
  });

  it('Should generate link to raw file', () => {
    expect(GithubHookService(payload, opts).get()[0].get().fileUrl)
      .toBe('https://raw.github.com/my_test/my_branch/my-added-file.md');
  });

  it('Should return list of changed files', () => {
    expect(GithubHookService(payload, opts).get()).toHaveLength(3);
  });

  it('Should accept filter function', () => {
    const added = ({ get }) => get().state === 'added';
    const modified = ({ get }) => get().state === 'modified';
    const removed = ({ get }) => get().state === 'removed';

    expect(GithubHookService(payload, opts).get(added)).toHaveLength(1);
    expect(GithubHookService(payload, opts)
      .get(modified)).toHaveLength(1);
    expect(GithubHookService(payload, opts).get(removed)).toHaveLength(1);
  });

  it.skip('Should call getContent', () => {
    const files = GithubHookService(payload, opts).fetchFilesContent()

    jest.runAllTimers();

    return files.then(([file]) => {
      expect(file).toBe('file-content');
    });
  });
});

