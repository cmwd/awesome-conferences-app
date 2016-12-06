import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConferenceEvent from './conference-event-component';
import * as selectors from 'state/events/events-selectors';
import * as actions from 'state/events/events-actions';

function mapStateToProps(state, props) {
  return selectors.getEvent(props.uuid)(state);
}

function mapActionsToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps)
(ConferenceEvent);
