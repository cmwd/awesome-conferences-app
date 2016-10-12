import _ from 'lodash';
import { createSelector } from 'reselect';

export const conferencePageSelector = ({ conference }) => {
  const { params, pages, items } = conference;
  const { current } = params;
  const pageItems = _.get(
    pages.find(({ page }) => page === current),
    'itemIds', []);

  return pageItems.reduce((result, confId) =>
    items[confId] ? [...result, items[confId]] : result, []);
};

export const paginationSelector = (
  { conference: { params: { current, limit, total } } }
) => ({ current, limit, total });

export const conferenceBySlugSelector = (
  { conference: { items } }, { params: { slug } }
) => {
  const confId = Object.keys(items).find(id => items[id].slug === slug);
  return confId ? items[confId] : undefined;
};

export const resourcesBySlugSelector = (
  { conference: { resources } }, { params: { slug } }
) => resources[slug];

export const editorStateSelector = ({ conference: { editor } }) => editor;

export const editorDataSelector = createSelector(
  conferenceBySlugSelector,
  resourcesBySlugSelector,
  editorStateSelector,
  (conference, resources, editorState) => {
    const youtubeChannelId = _.get(resources, 'youtube.resourceInfo.channelId');

    const editor = {
      youtubeChannelId:
        _.isString(editorState.youtubeChannelId)
          ? editorState.youtubeChannelId
          : youtubeChannelId || '',
    };

    const restore = Object.assign({}, { youtubeChannelId });

    return {
      editor,
      restore,
      conferenceName: _.get(conference, 'name', ''),
    };
  }
);
