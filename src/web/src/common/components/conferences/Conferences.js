import React, { PropTypes } from 'react';
import { Row, Pagination } from '../Bootstrap';
import Conference from './Conference';
import PaginationLink from '../PaginationLink';
import classNames from 'classnames';

const Conferences = params => {
  const cssClasses = classNames(
    'conferences',
    { 'conferences--is-loading': params.conferencesLoadingState });

  return (
    <div className={cssClasses}>
      <Row>
        {params.conferences.map((conference, id) =>
          <Conference {...conference} key={id} />
        )}
      </Row>
      <div className="conferences__pagination">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          buttonComponentClass={PaginationLink({ onSelect: params.onSelect })}
          items={params.pages.total}
          maxButtons={3}
          activePage={params.pages.current}
        />
      </div>
    </div>
  );
};

Conferences.propTypes = {
  conferences: PropTypes.array.isRequired,
  pages: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Conferences;
