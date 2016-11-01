import _ from 'lodash';
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

export const getConferences = params => ({
  types: [
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_REQUEST,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_SUCCESS,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_FAILURE,
  ],
  shouldCallAPI: state => conferencePageSelector(state).length === 0,
  callAPI: (state, { API_URL }) => {
    const { limit, current } = _.isObject(params)
      ? params
      : paginationSelector(state);
    const offset = limit * (current - 1);

    return fetch(`${API_URL}/conference?${stringify({ limit, offset })}`);
  },
});

