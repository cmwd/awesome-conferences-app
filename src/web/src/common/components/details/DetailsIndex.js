import React, { PropTypes } from 'react';
import classNames from 'classnames';

const BLOCK_NAME = 'details';
const DetailsIndex = ({ loading, description, name, banner }) => {
  const cssClasses = classNames(
    BLOCK_NAME,
    { [`${BLOCK_NAME}--loading`]: loading }
  );
  const bannerStyles = {
    backgroundImage: `url(${banner})`,
  };
  return (
    <div className={cssClasses}>
      <div className="details__banner" style={bannerStyles}>
        <h1 className="details__conf-name">{name}</h1>
      </div>
      <p>{description}</p>
    </div>
  );
};

DetailsIndex.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  banner: PropTypes.string,
};

export default DetailsIndex;
