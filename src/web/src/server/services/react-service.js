import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';
import thunk, { thunkQueue } from '../redux-thunk-watcher';
import { App } from '../../common/components';
import conferencesApp from '../../common/reducers';
import CONFIG from '../../../config';

const { BACKEND_API_URL: API_URL } = CONFIG;
const middlewares = [thunk.withExtraArgument({ API_URL })];
const render = ({ location, context, store }) =>
  renderToString(
    <Provider store={store}>
      <ServerRouter location={location} context={context}>
        <App />
      </ServerRouter>
    </Provider>
  );

export const prepareRender = ({ location }) => {
  const store = createStore(conferencesApp, applyMiddleware(...middlewares));
  const context = createServerRenderContext();
  let html = render({ location, context, store });
  const result = context.getResult();
  let state = store.getState();

  if (result.missed) {
    thunkQueue.clear();
    return Promise.resolve({ state, html, result });
  }

  return thunkQueue.isEmpty()
    ? Promise.resolve({ state, html, result })
    : new Promise((resolve) => {
      thunkQueue.onEnd(() => {
        state = store.getState();
        html = render({ location, context, store });
        resolve({ state, html, result });
      });
    });
};

