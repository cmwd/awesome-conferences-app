import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App, { appActions } from 'common/app';
import reducers from 'common/reducers';
import { ControlledRouter } from 'common/lib/redux-react-router-v4';
import callAPIMiddleware from 'common/lib/call-api-middleware';
import { NODE_ENV } from 'config';

let composeEnhancers = compose;
const rootElement = document.getElementById('root');
const location = Object.assign({}, document.location);
const middlewares = [
  callAPIMiddleware(process.env),
  thunk.withExtraArgument(process.env),
];
const {
  __PRELOADED_STATE__: preloadedState,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: reduxDevtoolsExtension,
} = window;

if (NODE_ENV !== 'production' && reduxDevtoolsExtension) {
  composeEnhancers = reduxDevtoolsExtension;
}

const store = createStore(reducers, preloadedState,
  composeEnhancers(applyMiddleware(...middlewares)));

render(
  <Provider
    store={store}
  >
    <ControlledRouter
      location={location}
      setLocation={
        currentLocation =>
          store.dispatch(appActions.setLocation(currentLocation))
      }
    >
      <App />
    </ControlledRouter>
  </Provider>, rootElement);

