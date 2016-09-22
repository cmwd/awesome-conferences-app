import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';
import thunkWatcher, { emitter as thunkEmitter } from '../redux-thunk-watcher';
import { App } from '../../common/components';
import conferencesApp from '../../common/reducers';
import CONFIG from '../../../config';

const { BACKEND_API_URL: API_URL } = CONFIG;
const middlewares = [thunkWatcher.withExtraArgument({ API_URL })];
const render = ({ store, location, context }) =>
  renderToString(
    <Provider store={store}>
      <ServerRouter location={location} context={context}>
        <App />
      </ServerRouter>
    </Provider>
  );

export const prepareStore = () =>
  createStore(conferencesApp, applyMiddleware(...middlewares));

export const prepareRender = ({ store, location }) => {
  const context = createServerRenderContext();
  const result = context.getResult();
  let html = render({ store, location, context });

  return new Promise((resolve) => {
    thunkEmitter.once('empty-queue', () => {
      const state = store.getState();
      html = render({ store, location, context });
      resolve({ state, html, result });
    });
  });
};

