import { connect } from 'react-redux';
import TalksComponent from './talks-component';
import {
  addTalk,
  updateTalk,
  destroyTalk,
  toggleComponentMode
} from './talks-actions';

function mapStateToProps({ talks }) {
  return talks;
}

function mapDispatcherToProps(dispatcher) {
  const addNewEntry = talkObj => dispatcher(addTalk(talkObj));
  const destroyEntry = key => dispatcher(destroyTalk(key));
  const updateEntry = (key, talkObj) => dispatcher(updateTalk(key, talkObj));
  const toggleInputMode = () => dispatcher(toggleComponentMode());

  return { addNewEntry, destroyEntry, updateEntry, toggleInputMode };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(TalksComponent);
