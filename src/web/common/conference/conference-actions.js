import { stringify } from 'querystring';
import fetch from '../service/fetch';
import { CONFERENCE_ACTIONS } from './conference-constants';
import { conferenceBySlug } from './conference-selectors';

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
  payload: { slug },
  shouldCallAPI: state =>
    force || !conferenceBySlug(state, { slug }),
  callAPI: (state, { API_URL }) =>
    fetch(`${API_URL}/conference/${slug}`),
});

export const getConferences = params => ({
  types: [
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_REQUEST,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_SUCCESS,
    CONFERENCE_ACTIONS.API_GET_CONFERENCES_FAILURE,
  ],
  callAPI: (state, { API_URL }) => {
    const { itemsLimit: limit, page } = params;
    const offset = limit * (page - 1);

    return fetch(`${API_URL}/conference?${stringify({ limit, offset })}`);
  },
});

