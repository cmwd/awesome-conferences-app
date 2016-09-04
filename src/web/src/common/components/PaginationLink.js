import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const onClick = ({ event, ...params }) => {
  if (params.disabled) {
    event.preventDefault();
  } else {
    params.onSelect(params.eventKey);
  }
};

const PaginationLink = ({ ...params, prefix = '' }) => (
  <Link
    to={`${prefix}/page/${params.eventKey}`}
    onClick={(event) => onClick({ ...params, event })}
  >
    {params.children}
  </Link>
);

const PageButtonValidatorWrapper = child =>
  ownParams =>
    props => child({ ...props, ...ownParams });

PaginationLink.propTypes = {
  children: PropTypes.element.isRequired,
  eventKey: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  itemsLimit: PropTypes.number.isRequired,
  prefix: PropTypes.string,
};

export default PageButtonValidatorWrapper(PaginationLink);
