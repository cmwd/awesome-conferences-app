import { connect } from 'react-redux';
import ConferencesList from './conferences-list-component';
import {
  getConferences,
  setPagination,
} from '../conference-actions';
import { AsyncHook } from '../../lib/server-async-hooks';
import {
  conferencePageSelector,
  paginationSelector,
} from '../conference-selectors';

const fetchInitialData = ({ params: { current }, dispatch }) => {
  dispatch(setPagination({ current }));
  return dispatch(getConferences());
};

const mapDispatchToProps = dispatch => ({
  setCurrentPage(currentPage) {
    const current = parseInt(currentPage, 10);
    dispatch(setPagination({ current }));
    dispatch(getConferences());
  },
});

const mapStateToProps = (state, params) => ({
  pagination: paginationSelector(state, params),
  conferences: conferencePageSelector(state, params),
});

const ConferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConferencesList);

export default AsyncHook(fetchInitialData)(ConferencesContainer);
