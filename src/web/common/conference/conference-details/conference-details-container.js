import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AsyncHook } from '../../lib/server-async-hooks';
import ConferenceDetails from './conference-details-component';
import { getConferenceBySlug } from '../conference-actions';
import { conferenceBySlug } from '../conference-selectors';
import { userSelectors } from '../../user';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(getConferenceBySlug(params.slug));

function mapStateToProps(state, props) {
  const { slug } = props.params;

  return createSelector(
    conferenceBySlug,
    userSelectors.userInfoSelector,
    (conference, user) => ({ conference, user }))(
    state, Object.assign({}, props, { slug }));
}

export default connect(
  mapStateToProps)(
  AsyncHook(
    fetchInitialData)(
    ConferenceDetails));
