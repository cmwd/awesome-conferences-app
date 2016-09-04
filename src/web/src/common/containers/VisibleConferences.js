import { connect } from 'react-redux';
import Conferences from '../components/conferences/Conferences';
import { selectConferencePage } from '../actions';

const mapStateToProps = ({ conferences, pages, conferencesLoadingState }) =>
  ({ conferences, pages, conferencesLoadingState });

const mapDispatchToProps = (dispatcher) => ({
  onSelect(page) {
    dispatcher(selectConferencePage(page));
  },
});

const VisibleConferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(Conferences);

export default VisibleConferences;
