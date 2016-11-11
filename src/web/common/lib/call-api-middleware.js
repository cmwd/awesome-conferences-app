/* eslint-disable no-alert */
/**
 * Extended version of callAPIMiddleware from redux recipes
 * https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md
 */
/* eslint-enable no-alert */

export default extraParam =>
  ({ dispatch, getState }) =>
    next =>
      (action) => {
        const {
          types,
          callAPI,
          shouldCallAPI = () => true,
          payload = {},
        } = action;
        const state = getState();

        if (!types) {
          // Normal action: pass it on
          return next(action);
        }

        if (
          !Array.isArray(types) ||
          types.length !== 3 ||
          !types.every(type => typeof type === 'string')
        ) {
          throw new Error('Expected an array of three string types.');
        }

        if (typeof callAPI !== 'function') {
          throw new Error('Expected callAPI to be a function.');
        }

        if (!shouldCallAPI(state)) {
          return undefined;
        }

        const [requestType, successType, failureType] = types;

        dispatch(Object.assign({}, payload, {
          type: requestType,
        }));

        return callAPI(state, extraParam)
          .then((response) => {
            if (response.ok) {
              return response.json()
                .then((data) => {
                  dispatch(Object.assign({}, payload, {
                    response: data,
                    type: successType,
                  }));

                  return data;
                });
            }

            return Promise.reject(dispatch(Object.assign({}, payload, {
              type: failureType,
            })));
          })
          .catch(error =>
            dispatch(Object.assign({}, payload, {
              error,
              type: failureType,
            })));
      };
