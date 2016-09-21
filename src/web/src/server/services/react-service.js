import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { App } from '../../common/components';
import conferencesApp from '../../common/reducers';

export const prepareStore = data => {
  const { conferences, pages } = data;
  return createStore(conferencesApp, { conferences, pages });
};

export const prepareRender = ({ store, location }) => {
  const context = createServerRenderContext();
  const state = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <ServerRouter location={location} context={context}>
        <App />
      </ServerRouter>
    </Provider>
  );
  const result = context.getResult();

  return { state, html, result };
};

