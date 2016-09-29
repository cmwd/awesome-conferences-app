import { CONFERENCES } from '../constants/action-types';

const replaceConference = conference =>
  current =>
    current._id === conference._id
      ? conference
      : current;

export default (state = [], action) => {
  switch (action.type) {

    case CONFERENCES.PUT_CONFERENCE:
      return state.length
        ? state.map(replaceConference(action.conference))
        : [action.conference];

    case CONFERENCES.SET_CONFERENCES:
      return action.conferences;

    default:
      return state;
  }
};
