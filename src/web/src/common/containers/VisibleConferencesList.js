import { connect } from 'react-redux';
import ConferencesList from '../components/ConferencesList';

const VisibleConferencesList = connect(
  (state) => state,
  () => ({
    onConferenceClick(ev) { console.log(ev); },
  })
)(ConferencesList);

export default VisibleConferencesList;
