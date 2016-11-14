import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AsyncHook } from '../lib/server-async-hooks';
import ConferenceDetails from './conference-details-page-component';
import { conferenceSelectors, conferenceActions } from '../conference';
import { userSelectors } from '../user';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(conferenceActions.getConferenceBySlug(params.slug));

function mapStateToProps(state, props) {
  const { slug } = props.params;

  return createSelector(
    conferenceSelectors.conferenceBySlug,
    userSelectors.userInfoSelector,
    (conference, user) => ({ conference, user }))(
    state, Object.assign({}, props, { slug }));
}

export default connect(
  mapStateToProps)(
  AsyncHook(
    fetchInitialData)(
    ConferenceDetails));
