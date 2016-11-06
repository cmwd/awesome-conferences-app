export const topLevelNavigationTabsSelector = (state, { location }) =>
  location.pathname.split('/').pop();

export const youtubeVideoImporterSelector = ({ resource }) =>
  resource.youtubeVideoImporter;

export const youtubeSelectedVideoItemsSelector = ({ resource }) =>
  resource.youtubeSelectedVideoItems;
