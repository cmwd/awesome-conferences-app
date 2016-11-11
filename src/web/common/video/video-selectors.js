import { createSelector } from 'reselect';

export const allVideosSelector = ({ video }) => video.items;

export const conferenceVideosSelector = createSelector(
  allVideosSelector,
  (state, ownProps) => ownProps.conferenceId,
  (items, conferenceId) =>
    items.filter(item => item.conferenceId === conferenceId));
