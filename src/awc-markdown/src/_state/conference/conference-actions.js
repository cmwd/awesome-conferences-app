import { UPDATE_CONFERENCE_INFO } from '../action-types';

export const updateConferenceInfo = (payload = {}) => ({
  type: UPDATE_CONFERENCE_INFO,
  payload
});
