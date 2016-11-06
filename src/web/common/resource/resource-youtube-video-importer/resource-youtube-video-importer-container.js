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
  addVideo,
  removeVideo,
  setYoutubeVideoSelect,
} from '../resource-actions';
import { getVideosByConferenceId } from '../../video/video-actions';
import VideoImporterComponent
  from './resource-youtube-video-importer-component';
import { AsyncHook } from '../../lib/server-async-hooks';

const THROTTLE_WAIT = 16;
const resourceName = 'YOUTUBE';

const fetchInitialData = ({ dispatch, conferenceId }) => {
  dispatch(setYoutubeImporter({ conferenceId }));
  return dispatch(getVideosByConferenceId(conferenceId))
    .then(({ videos }) => {
      dispatch(setYoutubeVideoSelect(videos));
    });
};

const mapStateToProps = createSelector(
  youtubeVideoImporterSelector,
  youtubeSelectedVideoItemsSelector,
  (state, { conferenceId }) => conferenceId,
  (
    { videoId }, items, conferenceId
  ) => (
    {
      videoId,
      items,
      conferenceId,
    })
);

const mapDispatchToProps = (dispatch, { conferenceId }) => ({
  onAdd(item) {
    dispatch(addVideo(Object.assign({}, item, { resourceName, conferenceId })));
  },
  onRemove(item) {
    dispatch(removeVideo(Object.assign({}, item, { conferenceId })));
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
