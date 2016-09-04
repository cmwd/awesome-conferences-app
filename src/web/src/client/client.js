import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, browserHistory as history, match } from 'react-router';
import { render } from 'react-dom';
import logger from 'redux-logger';
import rootReducer from '../common/reducers';
import routes from '../common/routes';

const { __PRELOADED_STATE__, __CONFIG__ } = window;
const store = createStore(
  rootReducer,
  __PRELOADED_STATE__,
  applyMiddleware(
    thunk.withExtraArgument(__CONFIG__),
    logger()
  ));

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('root')
  );
});
