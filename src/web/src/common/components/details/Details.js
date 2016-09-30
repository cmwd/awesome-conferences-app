import React, { PropTypes } from 'react';
import VisibleDetailsVideos from '../../containers/VisibleDetailsVideos';

const Details = ({ banner, name, description, conferenceId }) => (
  <div className="details">
    <p>{description}</p>
    <VisibleDetailsVideos conferenceId={conferenceId} />
  </div>
);

Details.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  conferenceId: PropTypes.string.isRequired,
};

export default Details;
