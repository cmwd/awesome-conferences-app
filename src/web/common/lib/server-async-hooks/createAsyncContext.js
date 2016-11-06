function createAsyncContext() {
  const asyncActions = [];

  return {
    resolve(cb) {
      return new Promise((resolve, reject) => {
        Promise.all(asyncActions)
          .then(() => resolve(cb()))
          .catch(reject);
      });
    },

    addAction(action) {
      asyncActions.push(Promise.resolve(action));
    },
  };
}

export default createAsyncContext;
