import { APPLICATION } from '../constants/action-types';

export const setLocation = location =>
  ({ type: APPLICATION.LOCATION_CHANGED, location });
