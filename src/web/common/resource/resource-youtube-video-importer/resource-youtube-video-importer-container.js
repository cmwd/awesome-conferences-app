import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { addVideo, removeVideo, getVideos } from 'common/video/video-actions';
import { conferenceVideosSelector } from 'common/video/video-selectors';
import { AsyncHook } from 'common/lib/server-async-hooks';
import Component from './resource-youtube-video-importer-component';
import { videoImporterFormSelector } from '../resource-selectors';
import { updateVideoImporterForm } from '../resource-actions';

const THROTTLE_WAIT = 16;
const resourceName = 'YOUTUBE';

const fetchInitialData = ({ dispatch, conferenceId }) =>
  dispatch(getVideos(conferenceId));

const conferenceIdSelector = (props, { conferenceId }) =>
  conferenceId;

const mapStateToProps = createSelector(
  conferenceVideosSelector,
  videoImporterFormSelector,
  conferenceIdSelector,
  (items, { videoId }, conferenceId) => ({ videoId, items, conferenceId }));

function mapDispatchToProps(dispatch, { conferenceId }) {
  const onAdd = item =>
    dispatch(addVideo(Object.assign({}, item, { resourceName, conferenceId })))
      .then(() =>
        dispatch(getVideos(conferenceId)));

  const onRemove = item =>
    dispatch(
      removeVideo(Object.assign({}, item, { conferenceId })))
      .then(() =>
        dispatch(getVideos(conferenceId)));

  const onUpdate = _.throttle(
    (value) => {
      dispatch(updateVideoImporterForm(value));
    }, THROTTLE_WAIT);

  return { onAdd, onRemove, onUpdate };
}

export default AsyncHook(
  fetchInitialData)(
  connect(
    mapStateToProps,
    mapDispatchToProps)(Component));
