import { CONFERENCE_ACTIONS } from './conference-constants';

const DEFAULT_STATE = {
  pageInfo: {
    current: 1,
    itemsLimit: 20,
    total: 0,
    pages: [],
  },
  items: {},
};

const addConferences = (stateItems, conferences) =>
  conferences.reduce((result, current) =>
    Object.assign({}, result, {
      [current._id]: current,
    }), stateItems);

const setPageConferences = (statePages, data) =>
  [
    ...statePages.filter(({ page }) => page !== data.pages.current),
    {
      page: data.pages.current,
      itemIds: data.conferences.map(({ _id }) => _id),
    },
  ];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case CONFERENCE_ACTIONS.ADD_PAGE:
      return Object.assign({}, state, {
        items: addConferences(state.items, action.data.conferences),
        pageInfo: Object.assign({}, state.pageInfo, {
          pages: setPageConferences(state.pageInfo.pages, action.data),
        }),
      });

    case CONFERENCE_ACTIONS.ADD_ITEM:
      return Object.assign({}, state, {
        items: addConferences(state.items, [action.data]),
      });

    case CONFERENCE_ACTIONS.SET_PAGINATION_INFO:
      return Object.assign({}, state, {
        pageInfo: Object.assign({}, state.pageInfo, action.pagesInfo),
      });

    case CONFERENCE_ACTIONS.SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pageInfo: Object.assign({}, state.pageInfo, {
          current: action.current,
        }),
      });

    default:
      return state;
  }
};
