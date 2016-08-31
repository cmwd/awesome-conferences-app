import React, { PropTypes } from 'react';
import ConferencesListItem from './ConferenceListItem';

const ConferencesList = ({ conferences, onConferenceClick }) => (
  <ul className="conferences-list">
    {conferences.map((conference, id) =>
      <ConferencesListItem
        {...conference}
        key={id}
        onConferenceClick={onConferenceClick}
      />
    )}
  </ul>
);

ConferencesList.propTypes = {
  conferences: PropTypes.array.isRequired,
  onConferenceClick: PropTypes.func.isRequired,
};

export default ConferencesList;
