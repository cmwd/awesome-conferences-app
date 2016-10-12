import React, { Component } from 'react';
import _ from 'lodash';
import { Col, Row } from '../../lib/bootstrap';
import FieldGroup from './conference-editor-field-group-component';

type ConferenceEditorProps = {
  fetchFormData: () => void,
  storeEditorFormData: () => void,
  submitResource: () => void,
  conferenceName: string,
  editor: {
    youtubeChannelId: string
  },
  restore: {
    youtubeChannelId: string
  },
};

const INPUT_NAME = {
  YOUTUBE_CHANNEL_ID: 'channelId',
};

/* eslint-disable class-methods-use-this */
class ConferenceEditor extends Component {
  componentWillMount() {
    this.props.fetchFormData();
  }

  componentWillUnmount() {
    this.props.storeEditorFormData(null);
  }

  props: ConferenceEditorProps;

  store(path, value) {
    this.props.storeEditorFormData(_.set({}, path, value));
  }

  restore(path) {
    const { storeEditorFormData, restore } = this.props;
    const restoreFn = (event) => {
      event.preventDefault();
      storeEditorFormData(restore);
    };

    return _.has(restore, path) && !_.isUndefined(restore[path])
      ? restoreFn
      : undefined;
  }

  saveInput(props) {
    return (event) => {
      event.preventDefault();
      this.props.submitResource(props);
    };
  }

  render() {
    const { editor } = this.props;

    return (
      <Row>
        <Col xs={10} xsPush={1}>
          <h2>{this.props.conferenceName}</h2>
          <form>
            <FieldGroup
              id={INPUT_NAME.YOUTUBE_CHANNEL_ID}
              type="text"
              label="Youtube ID"
              value={editor.youtubeChannelId}
              placeholder="Enter YouTube channel id."
              restore={this.restore('youtubeChannelId')}
              save={
                this.saveInput({
                  resourceName: 'YOUTUBE',
                  query: { channelId: editor.youtubeChannelId },
                })
              }
              onChange={
                ({ currentTarget: { value: channelId } }) =>
                  this.store('youtubeChannelId', channelId)
              }
            />
          </form>
        </Col>
      </Row>
    );
  }
}

export default ConferenceEditor;
