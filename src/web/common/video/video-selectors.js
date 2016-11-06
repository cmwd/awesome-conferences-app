import { createSelector } from 'reselect';

export const conferenceVideoIds = ({ video }, { conferenceId }) =>
  video.conferenceItems[conferenceId] || [];

export const videoItemsMapSelector = ({ video }) => video.items;

export const videoItemsSelector = createSelector(
  videoItemsMapSelector,
  videos => Object
    .keys(videos)
    .reduce((result, videoId) =>
      [...result, videos[videoId]], [])
);

export const videosByConferenceIdSelector = createSelector(
  conferenceVideoIds,
  videoItemsMapSelector,
  (videoIds, items) => videoIds.map(videoId => items[videoId])
);
