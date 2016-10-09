import React from 'react';
import { Link } from 'react-router';

type PropsTypes = {
  slug: String,
  name: String,
  details: Object,
};

const Conference = (
  { name, slug, details }: PropsTypes
) => (
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

export default Conference;
