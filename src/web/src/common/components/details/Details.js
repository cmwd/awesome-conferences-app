import React, { PropTypes } from 'react';
import VisibleDetailsVideos from '../../containers/VisibleDetailsVideos';

const Details = ({ banner, name, description, conferenceId, pathname }) => (
  <div className="details">
    <p>{description}</p>
    <VisibleDetailsVideos pathname={pathname} conferenceId={conferenceId} />
  </div>
);

Details.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  conferenceId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Details;
