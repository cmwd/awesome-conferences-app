import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ConferencesPageComponent from './conferences-page-component';
import { conferenceSelectors } from '../conference';

function mapStateToProps(state, props) {
  const page = parseInt(props.params.current, 10);
  const itemsLimit = 20;

  return createSelector(
    conferenceSelectors.totalPages,
    totalPages => ({ totalPages, itemsLimit, page }))(
    state, Object.assign({}, props, { page, itemsLimit }));
}

export default connect(mapStateToProps)(ConferencesPageComponent);
