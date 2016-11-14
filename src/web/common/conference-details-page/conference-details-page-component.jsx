import React from 'react';
import { VideoList } from '../video';
import { PageLayout } from '../page-layout';

type propTypes = {
  conference: {
    _id: string,
  },
  pathname: string,
};

function RenderVideoList(props: { conferenceId: string }) {
  return props.conferenceId
    ? (<VideoList {...props} />)
    : null;
}

export default function ConferenceDetailsPage(props: propTypes) {
  const { conference, pathname } = props;

  return (
    <PageLayout pageName="conference-details">
      <p>{conference.details.description}</p>
      <RenderVideoList pathname={pathname} conferenceId={conference._id} />
    </PageLayout>
  );
}
