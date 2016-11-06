import { connect } from 'react-redux';
import { AsyncHook } from '../../lib/server-async-hooks';
import VideosList from './video-list-component';
import { getVideosByConferenceId } from '../video-actions';
import { videosByConferenceIdSelector } from '../video-selectors';

const fetchInitialData = ({ dispatch, conferenceId }) =>
  dispatch(getVideosByConferenceId(conferenceId));

const VisibleDetailsVideos = connect(
  (state, props) => ({
    videos: videosByConferenceIdSelector(state, props),
    ...props,
  })
)(VideosList);

export default AsyncHook(fetchInitialData)(VisibleDetailsVideos);
