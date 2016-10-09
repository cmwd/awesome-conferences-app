import { connect } from 'react-redux';
import ConferencesList from './conferences-list-component';
import {
  fetchConferencesIfNeeded,
  setCurrentPage,
} from '../conference-actions';
import { AsyncHook } from '../../lib/server-async-hooks';
import { pageInfoSelector } from '../conference-selectors';

const fetchInitialData = ({ params, dispatch }) =>
  dispatch(fetchConferencesIfNeeded(params.current));

const mapDispatchToProps = dispatch => ({
  setCurrentPage(currentPage) {
    const currentPagaNumber = parseInt(currentPage, 10);
    dispatch(setCurrentPage(currentPagaNumber));
    dispatch(fetchConferencesIfNeeded(currentPagaNumber));
  },
});

const ConferencesContainer = connect(
  pageInfoSelector,
  mapDispatchToProps
)(ConferencesList);

export default AsyncHook(fetchInitialData)(ConferencesContainer);
