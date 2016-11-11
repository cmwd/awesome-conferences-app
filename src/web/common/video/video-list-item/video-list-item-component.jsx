import React from 'react';
import { Match, Link } from 'react-router';
import { VideoPlayerYoutube } from '../video-player';
import VideoModal from '../video-modal';
import { Row, Col } from '../../lib/bootstrap';

type videoItemType = {
  title: string,
  thumbnail: Object,
  videoId: string,
};

type propTypes = {
  pathname: string,
  internalId: string,
  item: videoItemType
};

function VideoItem({ pathname, id, internalId, item }: propTypes) {
  const videoUrl = `${pathname}/video/${internalId}`;

  return (
    <div className="video-item">
      <Link to={videoUrl} className="video-item__trigger" />

      <Row className="video-item__content">
        <Col
          xs={6}
          style={{ maxWidth: item.thumbnail.width }}
        >
          <img
            className="video-item__thumbnail"
            src={item.thumbnail.url}
            height={item.thumbnail.height}
            width={item.thumbnail.width}
          />
        </Col>
        <Col xs={6} className="video-item__meta">
          <h4>{item.title}</h4>
        </Col>
      </Row>

      <Match
        pattern={videoUrl}
        exactly
        render={
          () => (
            <VideoModal parentPath={pathname}>
              <VideoPlayerYoutube videoId={item.videoId} id={item._id} />
            </VideoModal>
          )
        }
      />
    </div>
  );
}

export default VideoItem;
