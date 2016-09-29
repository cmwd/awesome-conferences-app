import { CONFERENCES_PAGE } from '../constants/action-types';

const DEFAULT_STATE = {
  pagination: {
    total: 0,
    current: 0,
    itemsLimit: 20,
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case CONFERENCES_PAGE.SET_PAGINATION_DATA:
      return { ...state, pagination: action.pagination };

    case CONFERENCES_PAGE.SET_PAGINATION_INDEX:
      return {
        ...state,
        pagination: { ...state.pagination, current: action.current },
      };
    default:
      return state;
  }
};
