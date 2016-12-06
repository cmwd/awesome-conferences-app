import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as eventsActions from 'state/events/events-actions';
import SectionEventsComponent from './section-events-component';

function mapStateToProps(props) {
  const { events } = props;

  return { events };
}

function mapActionsToProps(dispatch) {
  return bindActionCreators(eventsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps)
(SectionEventsComponent);
