import React from 'react';
import { Provider } from 'react-redux';
import { ServerRouter } from 'react-router';
import { App } from '../../common/components';

type Props = {
  location: Object,
  context: Object,
  store: Object,
};

const AppIndex = ({ location, context, store } : Props) => (
  <Provider store={store}>
    <ServerRouter location={location} context={context}>
      <App />
    </ServerRouter>
  </Provider>
);

export default AppIndex;
