import { CONFERENCE_ACTIONS } from './conference-constants';
import { getConferences, getConference } from '../services/api-service';
import {
  paginationInfoSelector,
  currentPageSelector,
  conferenceBySlugSelector,
} from './conference-selectors';

export const addConferencePage = data =>
  ({ type: CONFERENCE_ACTIONS.ADD_PAGE, data });

export const addConferenceItem = data =>
  ({ type: CONFERENCE_ACTIONS.ADD_ITEM, data });

export const setPagesInfo = pagesInfo =>
  ({ type: CONFERENCE_ACTIONS.SET_PAGINATION_INFO, pagesInfo });

export const setCurrentPage = current =>
  ({ type: CONFERENCE_ACTIONS.SET_CURRENT_PAGE, current });

export const fetchConferencePage = pageIndex =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      const { itemsLimit } = paginationInfoSelector(getState());
      const offset = itemsLimit * (parseInt(pageIndex, 10) - 1);

      getConferences(API_URL)({ itemsLimit, offset })
        .then((data) => {
          dispatch(addConferencePage(data));
          dispatch(setPagesInfo(data.pages));
          resolve(data);
        })
        .catch(reject);
    });

export const fetchConference = slug =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      getConference(API_URL)({ slug })
        .then((conference) => {
          dispatch(addConferenceItem(conference));
          resolve(conference);
        })
        .catch(reject);
    });

export const fetchConferencesIfNeeded = pageNumber =>
  (...args) => {
    const [, getState] = args;

    return currentPageSelector(getState()).length
      ? Promise.resolve(null)
      : fetchConferencePage(pageNumber)(...args);
  };

export const fetchConferenceIfNeeded = slug =>
  (...args) => {
    const [, getState] = args;
    const item = conferenceBySlugSelector(getState(), { params: { slug } });

    return item !== null
      ? Promise.resolve(item)
      : fetchConference(slug)(...args);
  };

