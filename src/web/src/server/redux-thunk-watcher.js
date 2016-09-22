import EventEmitter from 'events';

export const emitter = new EventEmitter();
const pendingActions = [];

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
