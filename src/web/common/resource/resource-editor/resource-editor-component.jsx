import React from 'react';
import { Match, Redirect } from 'react-router';
import { Tabs, Tab } from '../../lib/bootstrap';
import { RESOURCE_ROUTES, RESOURCE_EVENT_KEY } from '../resource-constants';
import YoutubeVideoImporter from '../resource-youtube-video-importer';

type PropsTypes = {
  navigationTabs: Object,
  selectNavigationTabKey: () => void,
  location: Object,
};

const knownTabs = [
  RESOURCE_ROUTES.YOUTUBE_IMPORTER,
];

const redirectIfUnknowTab = ({ location: { pathname } }) =>
  knownTabs.includes(pathname)
    ? null
    : (<Redirect to={knownTabs[0]} />);

const ResourceEditorComponent = (
  { navigationTabs, selectNavigationTabKey, location }: PropsTypes
) => (
  <Tabs
    id="resource-tabs"
    activeKey={navigationTabs.activeKey}
    onSelect={selectNavigationTabKey}
  >
    <Match
      pattern={`${RESOURCE_ROUTES.EDITOR}`}
      render={redirectIfUnknowTab}
    />
    <Tab
      eventKey={RESOURCE_EVENT_KEY.YOUTUBE_IMPORTER}
      title="Youtube Video Importer"
    >
      <YoutubeVideoImporter
        conferenceId={location.query.id}
      />
    </Tab>
  </Tabs>
);

export default ResourceEditorComponent;
