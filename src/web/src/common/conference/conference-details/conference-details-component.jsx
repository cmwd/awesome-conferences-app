import React from 'react';
import { Link } from 'react-router';
import { VideoList } from '../../video';
import { CONFERENCE_ROUTES } from '../conference-constants';

type DetailsProps = {
  description: String,
};

type PropTypes = {
  conference: {
    _id: String,
    details: DetailsProps,
  },
  pathname: String,
};

const Details = ({ conference, user, pathname }: PropTypes) => (
  <div className="details">
    <p>{conference.details.description}</p>
    {
      user.loggedIn && user.admin
        ? <Link
          to={`${CONFERENCE_ROUTES.ADMIN_PANEL}/${conference.slug}`}
        >Edit conference</Link>
        : null
    }
    {
      /**
       * TODO: add ability to search by conference slug in video api
       */
      conference._id
        ? <VideoList pathname={pathname} conferenceId={conference._id} />
        : null
    }
  </div>
);

export default Details;
