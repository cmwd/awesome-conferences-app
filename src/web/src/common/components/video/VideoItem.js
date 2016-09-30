import React from 'react';

const chooseThumbnail = ({ medium }) => medium;

const VideoItem = ({ title, thumbnails }) => {
  const img = chooseThumbnail(thumbnails);

  return (
    <div className="video-item">
      <img src={img.url} height={img.height} width={img.width} />
      <h4>{title}</h4>
    </div>
  )};

export default VideoItem;
