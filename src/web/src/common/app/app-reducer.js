import _ from 'lodash';
import { document } from 'global';
import { APP_ACTIONS } from './app-constants';

const { hash, pathname, search } = _.get(document, 'location', {});
const DEFAULT = {
  location: { hash, pathname, search },
};

export default (state = DEFAULT, action) => {
  switch (action.type) {

    case APP_ACTIONS.LOCATION_CHANGED:
      return Object.assign({}, state, { location: action.location });

    default:
      return state;
  }
};
