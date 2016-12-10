import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConferenceEvent from './conference-events-component';
import * as selectors from 'state/events/events-selectors';
import * as actions from 'state/events/events-actions';

function mapStateToProps(state, props) {
  const events = selectors.getEvents(state);
  return { events };
}

function mapActionsToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ConferenceEvent);
