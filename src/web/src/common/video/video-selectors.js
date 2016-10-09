import { createSelector } from 'reselect';

export const conferenceVideoIds = ({ video }, { conferenceId }) =>
  video.conferenceItems[conferenceId] || [];

export const videoItems = ({ video }) => video.items;

export const videosByConferenceId = createSelector(
  conferenceVideoIds,
  videoItems,
  (videoIds, items) => videoIds.map(videoId => items[videoId])
);
