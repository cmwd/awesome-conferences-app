import React from 'react';
import VideoListItem from '../video-list-item';

type PropTypes = {
  videos: Array,
  pathname: String,
};

const VideoList = ({ videos, pathname }: PropTypes) => (
  <div>
    {
      videos.map(item =>
        (<VideoListItem
          item={item}
          internalId={item._id}
          pathname={pathname}
          key={item._id}
        />))
    }
  </div>
);

export default VideoList;
