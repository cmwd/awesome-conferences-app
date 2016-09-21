import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { render } from 'react-dom';
import logger from 'redux-logger';
import rootReducer from '../common/reducers';
import { App } from '../common/components';

const { __PRELOADED_STATE__ } = window;
const middlewares = [thunk.withExtraArgument(process.env)];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger());
}

const store = createStore(
  rootReducer,
  __PRELOADED_STATE__,
  applyMiddleware(...middlewares));


render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
