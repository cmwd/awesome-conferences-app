import _ from 'lodash';
import { document } from 'global';
import { APPLICATION } from '../constants/action-types';

const { hash, pathname, search } = _.get(document, 'location', {});
const DEFAULT = {
  location: { hash, pathname, search },
};

export default (state = DEFAULT, action) => {
  switch (action.type) {
    case APPLICATION.LOCATION_CHANGED:
      return Object.assign({}, state, action.location);
    default:
      return state;
  }
};
