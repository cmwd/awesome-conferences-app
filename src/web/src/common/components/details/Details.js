import React, { PropTypes } from 'react';
import VisibleDetailsVideos from '../../containers/VisibleDetailsVideos';

const getBannerStyles = url => ({
  backgroundImage: `url(${url})`,
});
const Details = ({ banner, name, description, conferenceId }) => (
  <div className="details">
    <div className="details__banner" style={getBannerStyles(banner)}>
      <h1 className="details__conf-name">{name}</h1>
    </div>
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
