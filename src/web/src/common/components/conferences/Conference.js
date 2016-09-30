import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col } from '../Bootstrap';
import LabelList from '../LabelList';

const Conference = ({ name, slug, details }) => {
  return (
    <article className="conference">
      <Link className="conference__link" to={`/details/${slug}`} >
        <div className="conference__thumbnail">
          <div
            className="conference__img"
            style={{ backgroundImage: `url(${details.banner})` }}/>
        </div>
        <div className="conference__meta">
          <h1 className="conference__name">{name}</h1>
        </div>
      </Link>
    </article>
  );
};

Conference.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.any.isRequired,
};

export default Conference;
