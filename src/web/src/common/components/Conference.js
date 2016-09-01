import React, { PropTypes } from 'react';
import { Col, Thumbnail } from './Bootstrap';
import LabelList from './LabelList';

const Conference = ({ onConferenceClick, ...conference }) => (
  <Col xs={6} sm={4} md={3}>
    <Thumbnail
      className="conference"
      src={conference.banner}
      alt={conference.name}
      onClick={onConferenceClick}
    >
      <LabelList items={[conference.region, conference.location]} />
      <h4>{conference.name}</h4>
      <p>{conference.description}</p>
    </Thumbnail>
  </Col>
);

Conference.propTypes = {
  onConferenceClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Conference;
