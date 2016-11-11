/**
 * @todo get rid of it
 */
export const topLevelNavigationTabsSelector = (state, { location }) =>
  location.pathname.split('/').pop();

export const videoImporterFormSelector = ({ resource }) =>
  resource.videoImporterForm;
