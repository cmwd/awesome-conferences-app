import React from 'react';
import { Match, Link } from 'react-router';
import { VideoPlayerYoutube } from '../video-player';
import VideoModal from '../video-modal';
import { Row, Col } from '../../lib/bootstrap';

const chooseThumbnail = ({ medium }) => medium;

type PropTypes = {
  title: string,
  thumbnails: Object,
  pathname: string,
  videoId: string,
  id: string,
  internalId: string,
};

const VideoItem = (
  { title, thumbnails, pathname, videoId, id, internalId }: PropTypes
) => {
  const img = chooseThumbnail(thumbnails);
  const videoUrl = `${pathname}/video/${internalId}`;

  return (
    <div className="video-item">
      <Link to={videoUrl} className="video-item__trigger" />

      <Row className="video-item__content">
        <Col
          xs={6}
          style={{ maxWidth: img.width }}
        >
          <img
            className="video-item__thumbnail"
            src={img.url}
            height={img.height}
            width={img.width}
          />
        </Col>
        <Col xs={6} className="video-item__meta">
          <h4>{title}</h4>
        </Col>
      </Row>

      <Match
        pattern={videoUrl}
        exactly
        render={
          props => (
            <VideoModal parentPath={pathname}>
              <VideoPlayerYoutube {...props} videoId={videoId} id={id} />
            </VideoModal>
          )
        }
      />
    </div>
  );
};

export default VideoItem;
