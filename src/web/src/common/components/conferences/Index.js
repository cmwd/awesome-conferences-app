import React, { PropTypes } from 'react';
import { Row, Pagination } from '../Bootstrap';
import Conference from './Conference';
import PaginationLink from '../PaginationLink';

const createConference = (props, key) =>
  (<Conference {...props} key={key} />);

const Index = ({ pagination, conferences, onSelect }) =>
(
  <div className="conferences">
    <Row>{conferences.map(createConference)}</Row>
    <div className="conferences__pagination">
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        buttonComponentClass={PaginationLink({ onSelect })}
        items={pagination.total}
        maxButtons={3}
        activePage={pagination.current}
      />
    </div>
  </div>
);

Index.propTypes = {
  conferences: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
  }),
  onSelect: PropTypes.func.isRequired,
};

export default Index;
