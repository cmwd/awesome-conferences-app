import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SectionHeaderComponent from './section-header-component';
import { getConference } from 'state/conference/conference-selectors';
import * as actions from 'state/conference/conference-actions';

function mapStateToProps(props) {
  return {
    conference: getConference(props)
  }
}

function mapActionsToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps)
(SectionHeaderComponent);
