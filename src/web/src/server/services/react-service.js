import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { createServerRenderContext } from 'react-router';
import thunk from 'redux-thunk';
import reducers from '../../common/reducers';
import CONFIG from '../../../config';
import { AppIndex, AsyncHook } from '../components';
import { createAsyncContext } from '../../common/lib/server-async-hooks';

const { BACKEND_API_URL: API_URL } = CONFIG;
const middlewares = [thunk.withExtraArgument({ API_URL })];

export const prepareRender = ({ location, preloadedState }) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middlewares));
  const context = createServerRenderContext();
  const asyncContext = createAsyncContext();
  const html = renderToString(
    AsyncHook(
      AppIndex)(
      { location, context, store, asyncContext }));
  const result = context.getResult();
  const state = store.getState();

  return result.missed
    ? Promise.resolve({ state, html, result })
    : asyncContext.resolve(
      () =>
        ({
          result,
          state: store.getState(),
          html: renderToString(
            <AppIndex location={location} contex={context} store={store} />
          ),
        }));
};

