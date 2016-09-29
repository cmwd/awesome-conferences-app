import { CONFERENCES } from '../constants/action-types';
import { getConferences, getConference } from '../services/api-service';

export const putConference = conference =>
  ({ type: CONFERENCES.PUT_CONFERENCE, conference });

export const setConferences = conferences =>
  ({ type: CONFERENCES.SET_CONFERENCES, conferences });

export const fetchConferences = pageIndex =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      const {
        conferencesPage: {
          pagination: { itemsLimit },
        },
      } = getState();
      const offset = itemsLimit * (parseInt(pageIndex, 10) - 1);

      getConferences(API_URL)({ itemsLimit, offset })
        .then((data) => {
          dispatch(setConferences(data.conferences));
          resolve(data);
        })
        .catch(reject);
    });

export const fetchConference = slug =>
  (dispatch, getState, { API_URL }) =>
    new Promise((resolve, reject) => {
      getConference(API_URL)({ slug })
        .then((conference) => {
          dispatch(putConference(conference));
          resolve(conference);
        })
        .catch(reject);
    });
