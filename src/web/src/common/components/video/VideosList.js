import React, { PropTypes } from 'react';
import VideoItem from './VideoItem';

const VideosList = ({ videos, pathname }) => (
  <div>
    {videos.map(({ _id, data }, key) =>
      (<VideoItem {...data} internalId={_id} pathname={pathname} key={key} />))}
  </div>
);

VideosList.propTypes = {
  videos: PropTypes.array.isRequired,
  conferenceId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default VideosList;
