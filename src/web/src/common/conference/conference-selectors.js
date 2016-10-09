import _ from 'lodash';
import { createSelector } from 'reselect';

export const currentPageSelector = ({ conference }) => {
  const { pageInfo, items } = conference;
  const { current, pages } = pageInfo;
  const pageItems = _.get(pages.find(({ page }) =>
    page === current), 'itemIds', []);

  return pageItems.reduce((result, confId) =>
    items[confId] ? [...result, items[confId]] : result, []);
};

export const paginationInfoSelector = (
  { conference: { pageInfo: { current, itemsLimit, total } } }
) => ({ current, itemsLimit, total });

export const pageInfoSelector = createSelector(
  currentPageSelector,
  paginationInfoSelector,
  (conferences, pagination) => ({ conferences, pagination })
);

export const conferenceBySlugSelector = (
  { conference: { items } }, { params: { slug } }
) => {
  const confId = Object.keys(items).find(id => items[id].slug === slug);
  return confId ? items[confId] : null;
};
