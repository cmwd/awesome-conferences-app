import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import logger from 'redux-logger';
import rootReducer from '../common/reducers';
import { App } from '../common/components';
import { ControlledRouter } from '../common/lib/redux-react-router-v4';
import { setLocation } from '../common/actions';
import './main.scss';

const { __PRELOADED_STATE__ } = window;
const middlewares = [thunk.withExtraArgument(process.env)];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger());
}

const store = createStore(
  rootReducer,
  __PRELOADED_STATE__,
  applyMiddleware(...middlewares));

const locationChanged = location =>
  store.dispatch(setLocation(location));

render(
  <Provider store={store}>
    <ControlledRouter
      location={Object.assign({}, document.location)}
      setLocation={locationChanged}
    >
      <App />
    </ControlledRouter>
  </Provider>,
  document.getElementById('root')
);

