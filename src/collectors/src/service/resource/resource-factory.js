function resourceFactory(methods) {
  function execute(method, query) {
    if (!methods[method]) {
      return Promise.reject(new Error('Unknown method'));
    }

    return methods[method](query);
  }

  return { execute };
}

module.exports = { resourceFactory };
