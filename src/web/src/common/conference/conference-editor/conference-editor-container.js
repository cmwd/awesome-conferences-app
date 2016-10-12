import { connect } from 'react-redux';
import _ from 'lodash';
import ConferenceEditorComponent from './conference-editor-component';
import { editorDataSelector } from '../conference-selectors';
import {
  storeEditorFormData,
  getConferenceBySlug,
  getResources,
  setResource,
} from '../conference-actions';

const THROTTLE_WAIT = 16;
const mapDispatchToProps = (dispatch, { params }) => ({
  storeEditorFormData: _.throttle(formData =>
    dispatch(storeEditorFormData(formData)), THROTTLE_WAIT),
  fetchFormData: () => {
    dispatch(getConferenceBySlug(params.slug, true));
    dispatch(getResources(params.slug));
  },
  submitResource: ({ resourceName, query }) =>
    dispatch(setResource({ slug: params.slug, resourceName, query })),
});

export default connect(
  editorDataSelector,
  mapDispatchToProps
)(ConferenceEditorComponent);

