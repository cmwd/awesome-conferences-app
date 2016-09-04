import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import conferencesApp from '../../common/reducers';

export const prepareStore = (conferencesData) => {
  const { conferences, pages } = conferencesData;
  return createStore(conferencesApp, { conferences, pages });
};

export const prepareRender = ({ store, renderProps }) => {
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const state = store.getState();

  return { state, html };
};

