import React from 'react';
import VideoListItem from '../video-list-item';

type PropTypes = {
  videos: Array,
  pathname: String,
};

const VideoList = ({ videos, pathname }: PropTypes) => (
  <div>
    {
      videos.map(({ _id, data }, key) =>
        (<VideoListItem
          {...data}
          internalId={_id}
          pathname={pathname}
          key={key}
        />))
    }
  </div>
);

export default VideoList;
