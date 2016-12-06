import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SpeakersListComponent from './speakers-list-component';
import * as selectors from 'state/events/events-selectors';
import * as actions from 'state/events/events-actions';

function mapStateToProps(state, props) {
  const talks = selectors.getTalks(props.uuid)(state);
  return { talks };
};

function mapActionsToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps)
(SpeakersListComponent);
