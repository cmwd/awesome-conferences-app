import { connect } from 'react-redux';
import { AsyncHook } from '../../lib/server-async-hooks';
import VideosList from './video-list-component';
import { getVideos } from '../video-actions';
import { videosByConferenceId } from '../video-selectors';

const fetchInitialData = ({ dispatch, conferenceId }) =>
  dispatch(getVideos(conferenceId));

const VisibleDetailsVideos = connect(
  (state, props) => ({
    videos: videosByConferenceId(state, props),
    ...props,
  })
)(VideosList);

export default AsyncHook(fetchInitialData)(VisibleDetailsVideos);