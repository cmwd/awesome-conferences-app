import { connect } from 'react-redux';
import { AsyncHook } from '../../lib/server-async-hooks';
import ConferenceDetails from './conference-details-component';
import { fetchConferenceIfNeeded } from '../conference-actions';
import { conferenceBySlugSelector } from '../conference-selectors';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(fetchConferenceIfNeeded(params.slug));

const VisibleDetailsIndex = connect(
  conferenceBySlugSelector)(
    ConferenceDetails);

export default AsyncHook(fetchInitialData)(VisibleDetailsIndex);
