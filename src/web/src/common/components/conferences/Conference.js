import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col } from '../Bootstrap';
import LabelList from '../LabelList';

const Conference = (props) => {
  const thumbStyles = {
    backgroundImage: `url(${props.banner})`,
  };

  return (
    <Col xs={6} sm={4}>
      <div className="conference">
        <Link to={`/details/${props._id}`} >
          <div
            className="conference__thumbnail"
            style={thumbStyles}
          />
          <div className="conference__location">
            <LabelList items={[props.region, props.location]} />
          </div>
          <h4>{props.name}</h4>
          <p>{props.description}</p>
        </Link>
      </div>
    </Col>
  );
};

Conference.propTypes = {
  name: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Conference;
