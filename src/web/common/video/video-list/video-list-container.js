import { connect } from 'react-redux';
import { AsyncHook } from '../../lib/server-async-hooks';
import VideosList from './video-list-component';
import { getVideos } from '../video-actions';
import { conferenceVideosSelector } from '../video-selectors';

const fetchInitialData = ({ dispatch, conferenceId }) =>
  dispatch(getVideos(conferenceId));

function mapStateToProps(state, props) {
  const videos = conferenceVideosSelector(state, props);

  return Object.assign({}, props, { videos });
}

const VisibleDetailsVideos = connect(mapStateToProps)(VideosList);

export default AsyncHook(fetchInitialData)(VisibleDetailsVideos);
