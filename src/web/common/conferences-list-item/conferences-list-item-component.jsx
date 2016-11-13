/* @flow */

import React from 'react';
import { Link } from 'react-router';
import './conferences-list-item.scss';

type conferenceTypes = {
  slug: String,
  name: String,
  details: Object,
};

type propTypes = {
  conference: conferenceTypes,
};

function Conference(props: propTypes) {
  const { slug, details, name } = props.conference;

  return (
    <article className="conference">
      <Link className="conference__link" to={`/details/${slug}`} >
        <div className="conference__thumbnail">
          <div
            className="conference__img"
            style={{ backgroundImage: `url(${details.banner})` }}
          />
        </div>
        <div className="conference__meta">
          <h1 className="conference__name">{name}</h1>
        </div>
      </Link>
    </article>
  );
}

export default Conference;
