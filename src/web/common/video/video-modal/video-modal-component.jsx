import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const VideoModal = ({ children, parentPath }) => (
  <div className="video-modal">
    <div className="video-modal__background">
      <Link className="video-modal__bg-close" to={parentPath} />
    </div>
    <div className="video-modal__content">
      <div className="video-modal__player">{children}</div>
    </div>
  </div>
);

VideoModal.propTypes = {
  children: PropTypes.element,
  parentPath: PropTypes.string.isRequired,
};

export default VideoModal;
