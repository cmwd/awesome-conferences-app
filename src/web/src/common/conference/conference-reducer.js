import _ from 'lodash';
import { CONFERENCE_ACTIONS } from './conference-constants';

const DEFAULT_STATE = {
  params: {
    limit: 20,
    current: 1,
    total: 0,
  },
  pages: [],
  items: {},
  resources: {},
  editor: {},
};

const addConferenceItems = (stateItems, conferences) =>
  conferences.reduce((result, current) =>
    Object.assign({}, result, {
      [current._id]: current,
    }), stateItems);

const getPaginationInfo = (state, newState) => ({
  current: newState.current
    ? parseInt(newState.current, 10)
    : state.current,
  limit: newState.limit || state.limit,
  total: newState.total || state.total,
});

const addConferencePage = (statePages, data) =>
  [
    ...statePages.filter(({ page }) => page !== data.pages.current),
    {
      page: data.pages.current,
      itemIds: data.conferences.map(({ _id }) => _id),
    },
  ];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case CONFERENCE_ACTIONS.API_GET_CONFERENCES_SUCCESS:
      return Object.assign({}, state, {
        items: addConferenceItems(state.items, action.response.conferences),
        pages: addConferencePage(state.pages, action.response),
        params: Object.assign({},
          state.params,
          { total: action.response.pages.total }),
      });

    case CONFERENCE_ACTIONS.API_GET_CONFERENCE_BY_SLUG_SUCCESS:
      return Object.assign({}, state, {
        items: addConferenceItems(state.items, [action.response]),
      });

    case CONFERENCE_ACTIONS.API_GET_RESOURCES_SUCCESS:
      return Object.assign({}, state, {
        resources: Object.assign({}, state.resources, {
          [action.slug]: action.response,
        }),
      });

    case CONFERENCE_ACTIONS.STORE_EDITOR_FORM_DATA:
      return Object.assign({}, state, {
        editor: action.editor === null
          ? DEFAULT_STATE.editor
          : Object.assign({}, state.editor, action.editor),
      });

    case CONFERENCE_ACTIONS.SET_PAGINATION_INFO:
      return Object.assign({}, state, {
        params: Object.assign(
          {}, state.params, getPaginationInfo(state.params, action.params)),
      });

    default:
      return state;
  }
};
