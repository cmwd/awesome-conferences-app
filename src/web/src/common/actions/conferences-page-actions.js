import { fetchConferences } from './conferences-actions';
import { CONFERENCES_PAGE } from '../constants/action-types';

export const setPaginationIndex = current =>
  ({ type: CONFERENCES_PAGE.SET_PAGINATION_INDEX, current });

export const setPaginationData = pagination =>
  ({ type: CONFERENCES_PAGE.SET_PAGINATION_DATA, pagination });

export const fetchConferencesIfNeeded = index =>
  (...args) => {
    const [dispatch, getState] = args;
    const pageIndex = parseInt(index, 10);
    const {
      conferences,
      conferencesPage: { pagination: { current } },
    } = getState();

    return conferences.length && current === pageIndex
      ? Promise.resolve(null)
      : fetchConferences(pageIndex)(...args)
        .then((data) => {
          dispatch(setPaginationData(data.pages));
          return Promise.resolve(data);
        });
  };
