import React, { PropTypes } from 'react';

const ConferencesListItem = ({ name, onConferenceClick }) => (
  <li className="conference-list__item" onClick={onConferenceClick}>{name}</li>
);

ConferencesListItem.propTypes = {
  onConferenceClick: PropTypes.func.isRequired,
};

export default ConferencesListItem;
