import { createStore, combineReducers } from 'redux';

import conference from './conference/conference-reducer';
import events from './events/events-reducer';

export const reducer = combineReducers({
  conference,
  events
});

export function createReduxStore(initState = {}) {
  return createStore(reducer, initState);
}
