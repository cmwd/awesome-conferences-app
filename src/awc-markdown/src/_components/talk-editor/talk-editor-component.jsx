import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import ControlBar from './control-bar-component';
import Fields from './fields-component';

const DEFAULT_VALUES = {
  speaker: '',
  title: '',
  email: '',
  twitterId: '',
  video: '',
  slides: '',
  uuid: null,
};

function sanitize(props) {
  return Object
    .keys(DEFAULT_VALUES)
    .reduce((res, key) =>
      Object.assign({}, res, { [key]: props[key] }), {});
}

export default class TalkEditor extends Component {
  static COMPONENT_MODE = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
  };

  static defaultProps = Object.assign({}, DEFAULT_VALUES, {
    destroy: false,
    componentMode: TalkEditor.COMPONENT_MODE.CREATE,
  });

  constructor(props) {
    super(props);
    this.initState = props;
    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSubmit(event, { formData }) {
    const { uuid } = this.props;
    const talkObject = Object.assign({}, sanitize(formData), { uuid });

    event.preventDefault();

    if (formData.destroy) {
      this.props.destroyTalk(talkObject);
    } else if (this.props.componentMode === TalkEditor.COMPONENT_MODE.UPDATE) {
      this.props.updateTalk(talkObject);
    } else if (this.props.componentMode === TalkEditor.COMPONENT_MODE.CREATE) {
      this.props.createTalk(talkObject);
    }
  }

  handleClose() {
    this.setState(this.initState);
    this.props.onClose();
  }

  handleCheckboxChange(event, { name, checked }) {
    this.setState({ [name]: checked });
  }

  handleFieldChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Form
        size="mini"
        onSubmit={this.handleSubmit}
        onReset={this.handleClose}
      >
        <Grid>
          <Fields
            {...this.state}
            onFieldChange={this.handleFieldChange}
          />
          <ControlBar
            {...this.state}
            onCheckboxChange={this.handleCheckboxChange}
          />
        </Grid>
      </Form>
    );
  }
}
