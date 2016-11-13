import _ from 'lodash';
import { CONFERENCE_ACTIONS } from './conference-constants';

const DEFAULT_STATE = {
  items: [],
};

function mergeItems(items, response) {
  const { limit, offset: start, count } = response.info;
  const conferences = response.conferences;
  const end = limit + start;

  function iterator(item, index) {
    return _.inRange(index, start, end)
      ? conferences.shift()
      : items[index] || null;
  }

  return Array.from({ length: count }, iterator);
}

export default (state = DEFAULT_STATE, action) => {
  let items = state.items;

  switch (action.type) {
    case CONFERENCE_ACTIONS.API_GET_CONFERENCES_SUCCESS:
      items = mergeItems(items, action.response);
      return Object.assign({}, state, { items });

    case CONFERENCE_ACTIONS.API_GET_CONFERENCE_BY_SLUG_SUCCESS:
      items = state.items.filter(({ slug }) => slug !== action.slug)
        .concat(action.response.conference);
      return Object.assign({}, state, { items });

    default:
      return state;
  }
};
