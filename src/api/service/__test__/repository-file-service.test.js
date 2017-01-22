const RepositoryFileService = require('../repository-file-service');

let parser;
let fetch;

const fileDescriptor = {
  state: 'added',
  fileUrl: 'file-url',
};

const rawFileContent = [
  '```yaml',
  'file-content',
  '```'
].join('\n');

const setup = () => {
  parser = jest.fn(() => Promise.resolve('parsed-content'));
  fetch = jest.fn(() => Promise.resolve(rawFileContent));
};

describe('Repository File Service', () => {
  beforeEach(setup);

  it('Should return factory function', () => {
    expect(typeof RepositoryFileService(fileDescriptor) === 'object').toBeTruthy();
  });

  it('Should call fetch', () => {
    const file = RepositoryFileService(fileDescriptor, { parser, fetch });

    expect(fetch).not.toHaveBeenCalled();
    expect(file.getContent()).toBeInstanceOf(Promise);
    expect(fetch).toHaveBeenCalledWith('file-url');
  });

  it('Should call parser', () => {
    const file = RepositoryFileService(fileDescriptor, { parser, fetch });

    expect(parser).not.toHaveBeenCalled();
    return file.getContent().then(({ get }) => {
      const { fileContent, fileUrl, state } = get();

      expect(parser).toHaveBeenCalledWith('file-content');
      expect(fileContent).toBe('parsed-content');
      expect(fileUrl).toBe('file-url');
      expect(state).toBe('added');
    });
  });

  it('Should choose proper files from array', () => {
    const files = [
      fileDescriptor,
      { state: 'modified' },
      { state: 'removed' },
    ].map(file => ({ get() { return file; } }));

    expect(files.filter(RepositoryFileService.selector.toProcess))
      .toHaveLength(2);
  });
});
