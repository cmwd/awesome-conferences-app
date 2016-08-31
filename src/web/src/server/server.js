import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import conferencesApp from '../common/reducers';
import { App } from '../common/components';
import fetch from 'node-fetch';

function init() {
  const app = Express();
  const { NODE_PORT, NODE_API_URL } = process.env;

  const getConferences = () =>
    fetch(`${NODE_API_URL}/conferences`).then(response => response.json());
  const prepareStore = ([conferencesData]) => {
    const { conferences, pages } = conferencesData;
    return createStore(conferencesApp, { conferences, pages });
  };
  const prepareRender = (store) => {
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const preloadedState = store.getState();

    return { preloadedState, html };
  };

  function handleRender(req, res, next) {
    Promise
      .all([getConferences()])
      .then(prepareStore)
      .then(prepareRender)
      .then(data => res.render('index', data))
      .catch(next);
  }

  app.use(handleRender);
  app.set('view engine', 'pug');
  app.set('views', './src/server/views');
  app.listen(NODE_PORT);
}

export default { init };
