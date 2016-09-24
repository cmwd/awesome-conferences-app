import React from 'react';
import classNames from 'classnames';

const BLOCK_NAME = 'details';
const DetailsIndex = ({ loading, params, description, name, banner }) => {
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

export default DetailsIndex;
