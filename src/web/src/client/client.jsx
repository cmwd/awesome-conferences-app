import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App, { appActions } from '../common/app';
import reducers from '../common/reducers';
import { ControlledRouter } from '../common/lib/redux-react-router-v4';
import callAPIMiddleware from '../common/lib/call-api-middleware';
import { NODE_ENV } from '../../config';
import './main.scss';

const { __PRELOADED_STATE__, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } = window;
let composeEnhancers = compose;

const middlewares = [
  callAPIMiddleware(process.env),
  thunk.withExtraArgument(process.env),
];

if (NODE_ENV !== 'production') {
  composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducers,
  __PRELOADED_STATE__,
  composeEnhancers(applyMiddleware(...middlewares)));


const locationChanged = location =>
  store.dispatch(appActions.setLocation(location));

render(
  <Provider store={store}>
    <ControlledRouter
      location={Object.assign({}, document.location)}
      setLocation={locationChanged}
    >
      <App />
    </ControlledRouter>
  </Provider>,
  document.getElementById('root')
);

