import { connect } from 'react-redux';
import Conferences from '../components/Conferences';

const VisibleConferences = connect(
  ({ conferences, pages }) => ({ conferences, pages }),
  () => ({
    onConferenceClick(ev) { console.log(ev); },
    onSelectPage(ev) { console.log(ev); },
  })
)(Conferences);

export default VisibleConferences;
