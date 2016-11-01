import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  youtubeVideoImporterSelector,
  youtubeSelectedVideoItemsSelector,
} from '../resource-selectors';
import {
  setYoutubeImporter,
  toggleVideo,
  saveVideos,
  setYoutubeVideoSelect,
} from '../resource-actions';
import { getVideosByConferenceId } from '../../video/video-actions';
import VideoImporterComponent
  from './resource-youtube-video-importer-component';
import { AsyncHook } from '../../lib/server-async-hooks';
import { denormalizeYoutubeVideo } from '../resource-utils';

const THROTTLE_WAIT = 16;

const fetchInitialData = ({ dispatch, conferenceId }) => {
  dispatch(setYoutubeImporter({ conferenceId }));
  return dispatch(getVideosByConferenceId(conferenceId))
    .then(({ videos }) => {
      const items = videos.map(denormalizeYoutubeVideo);
      dispatch(setYoutubeVideoSelect(items));
    });
};

const mapStateToProps = createSelector(
  youtubeVideoImporterSelector,
  youtubeSelectedVideoItemsSelector,
  (state, { conferenceId }) => conferenceId,
  (
    { videoId }, items, conferenceId
  ) => ({ videoId, items, conferenceId })
);

const mapDispatchToProps = dispatch => ({
  onSubmit(props) {
    const query = Object.assign({}, props, {
      resourceName: 'YOUTUBE',
    });
    dispatch(setYoutubeImporter({ videoId: '' }));
    dispatch(saveVideos(query));
  },
  onAdd(item) {
    dispatch(toggleVideo(item));
    dispatch(setYoutubeImporter({ videoId: '' }));
  },
  onRemove(item) {
    dispatch(toggleVideo(item));
  },
  onUpdate: _.throttle(value =>
      dispatch(setYoutubeImporter(value)),
    THROTTLE_WAIT),
});

export default AsyncHook(
  fetchInitialData)(
  connect(
    mapStateToProps,
    mapDispatchToProps)(
    VideoImporterComponent)
  );
