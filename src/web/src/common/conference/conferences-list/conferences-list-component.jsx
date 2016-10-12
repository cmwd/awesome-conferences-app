import React, { Component } from 'react';
import { Link } from 'react-router';
import { Pagination } from '../../lib/bootstrap';
import Conference from '../conferences-list-item';
import { CONFERENCE_ROUTES } from '../conference-constants';

type PaginationType = {
  total: Number,
  current: Number,
};
type PropsType = {
  conferences: Array,
  pagination: PaginationType,
  setCurrentPage: () => Promise,
};
type PaginationButtonType = {
  eventKey: Number,
  children: Object
};

const PaginationLink = ({ eventKey, children }: PaginationButtonType) => (
  <Link to={`${CONFERENCE_ROUTES.LIST}/${eventKey}`}>
    {children}
  </Link>
);

const PaginationLinks = ({ total, current }: PaginationType) => (
  <Pagination
    prev
    next
    boundaryLinks
    ellipsis
    buttonComponentClass={
      ({ eventKey, children }: PaginationButtonType) =>
        eventKey
          ? PaginationLink({ eventKey, children })
          : children
    }
    items={total}
    maxButtons={3}
    activePage={current}
  />
);

/* eslint-disable class-methods-use-this */
class ConferencesList extends Component {
  componentWillReceiveProps(props) {
    const { pagination, setCurrentPage, params } = props;
    const newPageNumber = parseInt(params.current, 10);

    if (pagination.current !== newPageNumber) {
      setCurrentPage(newPageNumber);
    }
  }

  props: PropsType;

  render() {
    const { conferences, pagination } = this.props;
    return (
      <div className="conferences">
        {conferences.map((props, key) => (<Conference {...props} key={key} />))}
        <div className="conferences__pagination">
          <PaginationLinks {...pagination} />
        </div>
      </div>
    );
  }
}

export default ConferencesList;
