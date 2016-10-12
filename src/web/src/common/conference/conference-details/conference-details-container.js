import { connect } from 'react-redux';
import { AsyncHook } from '../../lib/server-async-hooks';
import ConferenceDetails from './conference-details-component';
import { getConferenceBySlug } from '../conference-actions';
import { conferenceBySlugSelector } from '../conference-selectors';
import { userSelectors } from '../../user';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(getConferenceBySlug(params.slug));

const ConferenceDetailsContainer = connect(
  (state, props) => ({
    conference: conferenceBySlugSelector(state, props) || { details: {} },
    user: userSelectors.userInfoSelector(state, props),
  }))(
    ConferenceDetails);

export default AsyncHook(fetchInitialData)(ConferenceDetailsContainer);
