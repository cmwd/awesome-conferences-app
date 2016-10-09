import React from 'react';
import { VideoList } from '../../video';

type DetailsProps = {
  description: String,
};

type PropTypes = {
  details: DetailsProps,
  pathname: String,
  _id: String,
};

const Details = ({ details = {}, pathname, _id }: PropTypes) => (
  <div className="details">
    <p>{details.description}</p>
    {
      /**
       * TODO: add ability to search by conference slug in video api
       */
      _id
        ? <VideoList pathname={pathname} conferenceId={_id} />
        : null
    }
  </div>
);

export default Details;
