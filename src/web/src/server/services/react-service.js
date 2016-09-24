import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';
import thunk from 'redux-thunk';
import { App } from '../../common/components';
import conferencesApp from '../../common/reducers';
import CONFIG from '../../../config';
import {
  createAsyncContext,
  AsyncActions,
} from '../../common/lib/server-async-hooks';

const { BACKEND_API_URL: API_URL } = CONFIG;
const middlewares = [thunk.withExtraArgument({ API_URL })];

const AppIndex = ({ location, context, store }) => (
  <Provider store={store}>
    <ServerRouter location={location} context={context}>
      <App />
    </ServerRouter>
  </Provider>
);

const AsyncHookWrapper = ({ asyncContext, ...props }) => (
  <AsyncActions context={asyncContext}>
    <AppIndex {...props} />
  </AsyncActions>
);

const render = props =>
  Component =>
    renderToString(<Component {...props} />);

export const prepareRender = ({ location }) => {
  const store = createStore(conferencesApp, applyMiddleware(...middlewares));
  const context = createServerRenderContext();
  const asyncContext = createAsyncContext();
  const html = render(
    { location, context, store, asyncContext })(AsyncHookWrapper);
  const result = context.getResult();
  const state = store.getState();

  return result.missed
    ? Promise.resolve({ state, html, result })
    : asyncContext.resolve(
      () =>
        ({
          result,
          state: store.getState(),
          html: render({ location, context, store })(AppIndex),
        }));
};

