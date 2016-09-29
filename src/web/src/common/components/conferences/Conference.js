import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col } from '../Bootstrap';
import LabelList from '../LabelList';

const Conference = ({ name, slug, details }) => {
  return (
    <Col xs={6} sm={4}>
      <div className="conference">
        <Link to={`/details/${slug}`} >
          <div
            className="conference__thumbnail"
            style={{ backgroundImage: `url(${details.banner})` }}
          />
          <div className="conference__location">
            <LabelList items={[details.location]} />
          </div>
          <h4>{name}</h4>
        </Link>
      </div>
    </Col>
  );
};

Conference.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.any.isRequired,
};

export default Conference;
