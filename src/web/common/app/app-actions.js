import { APP_ACTIONS } from './app-constants';

export const setLocation = location =>
  ({ type: APP_ACTIONS.LOCATION_CHANGED, location });

