import { stringify } from 'querystring';
import fetch from '../utils/fetch';
import { CONFERENCE_ACTIONS } from './conference-constants';
import {
  paginationSelector,
  conferencePageSelector,
  conferenceBySlugSelector,
} from './conference-selectors';
import { userSelectors } from '../user';

export const setPagination = params =>
  ({ type: CONFERENCE_ACTIONS.SET_PAGINATION_INFO, params });

export const storeEditorFormData = editor =>
  ({ type: CONFERENCE_ACTIONS.STORE_EDITOR_FORM_DATA, editor });

export const setResource = ({ slug, resourceName, query }) => {
  const opts = {
    method: 'PUT',
    credentials: 'include',
    body: '',
  };

  return {
    types: [
      CONFERENCE_ACTIONS.API_SET_RESOURCES_REQUEST,
      CONFERENCE_ACTIONS.API_SET_RESOURCES_SUCCESS,
      CONFERENCE_ACTIONS.API_SET_RESOURCES_FAILURE,
    ],
    callAPI: (state, { API_URL }) => {
      const { token } = userSelectors.userInfoSelector(state);
      return fetch(
        `${API_URL}/resource/${slug}/${resourceName}?${stringify(query)}`,
        Object.assign({}, opts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }));
    },
  };
};

export const getResources = slug => ({
  types: [
    CONFERENCE_ACTIONS.API_GET_RESOURCES_REQUEST,
    CONFERENCE_ACTIONS.API_GET_RESOURCES_SUCCESS,
    CONFERENCE_ACTIONS.API_GET_RESOURCES_FAILURE,
  ],
  payload: { slug },
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/resource/${slug}`),
});

export const getConferenceBySlug = (slug, force = false) => ({
  types: [
    CONFERENCE_ACTIONS.API_GET_CONFERENCE_BY_SLUG_REQUEST,
    CONFERENCE_ACTIONS.API_GET_CONFERENCE_BY_SLUG_SUCCESS,
    CONFERENCE_ACTIONS.API_GET_CONFERENCE_BY_SLUG_FAILURE,
  ],
  shouldCallAPI: state =>
    force || !conferenceBySlugSelector(state, { params: { slug } }),
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/conference/${slug}`),
});

export const getConferences = pageIndex => ({
  types: [
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_REQUEST,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_SUCCESS,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_FAILURE,
  ],
  shouldCallAPI: state => conferencePageSelector(state).length === 0,
  callAPI: (state, { API_URL }) => {
    const { limit } = paginationSelector(state);
    const offset = limit * (parseInt(pageIndex, 10) - 1);

    return fetch(`${API_URL}/conference?${stringify({ limit, offset })}`);
  },
});

