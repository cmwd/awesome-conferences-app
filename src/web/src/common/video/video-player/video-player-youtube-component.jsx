import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId, id }) => (
  <YouTube
    videoId={videoId}
    id={id}
  />
);

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default YouTubeVideo;
