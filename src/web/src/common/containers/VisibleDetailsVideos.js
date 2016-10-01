import { connect } from 'react-redux';
import { AsyncHook } from '../lib/server-async-hooks';
import VideosList from '../components/video/VideosList';
import { fetchDetailsVideos } from '../actions/';

const fetchInitialData = ({ dispatch, conferenceId }) =>
  dispatch(fetchDetailsVideos(conferenceId));

const getVideos = ({ conferenceId, videos }) => {
  const conference = videos.find(v => v.conferenceId === conferenceId);
  return conference ? conference.videos : [];
};

const mapStateToProps = ({ videos }, { conferenceId, pathname }) =>
  ({ videos: getVideos({ conferenceId, videos }), pathname });

const VisibleDetailsVideos = connect(mapStateToProps)(VideosList);

export default AsyncHook(fetchInitialData)(VisibleDetailsVideos);
