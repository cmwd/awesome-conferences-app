import EventEmitter from 'events';

const pendingActions = [];
const emitter = new EventEmitter();

export const thunkQueue = {
  clear() {
    pendingActions.length = 0;
  },
  isEmpty() {
    return pendingActions.length === 0;
  },
  onEnd(cb) {
    emitter.once('empty-queue', cb);
  },
};

function checker() {
  pendingActions.shift();
  if (!pendingActions.length) {
    emitter.emit('empty-queue');
  }
}

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const newAction = Promise.resolve(
        action(dispatch, getState, extraArgument));

      pendingActions.push(newAction);
      newAction.then(checker);
      return newAction;
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
