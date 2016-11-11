import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';

const opts = {
  playerVars: {
    autoplay: 1,
    showinfo: 0,
  },
};

const YouTubeVideo = ({ videoId, id }) => (
  <YouTube
    videoId={videoId}
    id={id}
    opts={opts}
  />
);


YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default YouTubeVideo;
