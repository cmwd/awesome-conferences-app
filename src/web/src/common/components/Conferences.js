import React, { PropTypes } from 'react';
import { Row, Pagination } from './Bootstrap';
import Conference from './Conference';

const Conferences = ({
  conferences,
  pages,
  onConferenceClick,
  onSelectPage,
}) => (
  <div className="conferences">
    <Row>
      {conferences.map((conference, id) =>
        <Conference
          {...conference}
          key={id}
          onConferenceClick={onConferenceClick}
        />
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
        items={pages.total}
        maxButtons={3}
        activePage={pages.current}
        onSelect={onSelectPage}
      />
    </div>
  </div>
);

Conferences.propTypes = {
  conferences: PropTypes.array.isRequired,
  pages: PropTypes.object.isRequired,
  onConferenceClick: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
};

export default Conferences;
