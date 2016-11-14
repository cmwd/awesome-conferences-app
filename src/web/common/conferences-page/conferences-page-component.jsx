import React from 'react';
import { Link } from 'react-router';
import ConferencesList from '../conferences-list';
import ConferencesListItem from '../conferences-list-item';
import { Pagination } from '../lib/bootstrap';
import { PageLayout } from '../page-layout';
import { CONFERENCES_PAGE_ROUTES } from './conferences-page-constants';

type propTypes = {
  page: number,
  totalPages: number,
  itemsLimit: number,
};

function PaginationLink(props) {
  const { eventKey, children } = props;

  return eventKey
    ? (
      <Link to={`${CONFERENCES_PAGE_ROUTES.LIST}/${eventKey}`}>
        {children}
      </Link>)
    : children;
}

export default function HomePage(props: propTypes) {
  const { page, totalPages, itemsLimit } = props;

  return (
    <PageLayout pageName="home-page">
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
    </PageLayout>
  );
}
