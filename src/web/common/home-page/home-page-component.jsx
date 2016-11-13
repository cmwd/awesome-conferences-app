import React from 'react';
import { Link } from 'react-router';
import { CONFERENCE_ROUTES } from '../conference';
import ConferencesList from '../conferences-list';
import ConferencesListItem from '../conferences-list-item';
import { Pagination } from '../lib/bootstrap';

type propTypes = {
  page: Number,
  totalPages: Number,
  itemsLimit: Number,
};

function PaginationLink({ eventKey, children }) {
  return eventKey
    ? (<Link to={`${CONFERENCE_ROUTES.LIST}/${eventKey}`}>{children}</Link>)
    : children;
}

export default function HomePage(props: propTypes) {
  const { page, totalPages, itemsLimit } = props;

  return (
    <div className="home-page">
      <ConferencesList
        page={page}
        itemsLimit={itemsLimit}
        itemComponent={ConferencesListItem}
      />
      <div className="conferences__pagination">
        <Pagination
          prev
          next
          boundaryLinks
          ellipsis
          buttonComponentClass={args => (<PaginationLink {...args} />)}
          items={totalPages}
          maxButtons={3}
          activePage={page}
        />
      </div>
    </div>
  );
}
