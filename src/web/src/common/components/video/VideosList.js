import React, { PropTypes } from 'react';
import VideoItem from './VideoItem';

const VideosList = ({ videos }) => (
  <div>
    {videos.map(({ data }, key) => <VideoItem {...data} key={key} />)}
  </div>
);

VideosList.propTypes = {
  videos: PropTypes.array.isRequired,
  conferenceId: PropTypes.string.isRequired,
};

export default VideosList;
