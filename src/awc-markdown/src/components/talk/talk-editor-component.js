import React, { Component } from 'react';
import omit from 'lodash/omit';
import { Button, Form, Grid, Icon, Checkbox } from 'semantic-ui-react'

class TalkEditorComponent extends Component {
  static defaultProps = {
    speaker: '',
    email: '',
    twitter: '',
    title: '',
    video: '',
    slides: '',
    destroy: false
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({}, TalkEditorComponent.defaultProps, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSubmit(event, talkObj) {
    const props = omit(talkObj, ['destroy']);
    
    event.preventDefault();
    this.handleFormReset();
    
    if (!talkObj.destroy) {
      this.props.onSubmit(props);
    } else {
      this.props.onDestroy(props);
    }
  }

  handleCancel(event) {
    this.props.onCancel();
  }

  handleInputChange(event, input) {
    const state = { [input.name]: input.value };
    this.setState(state);
  }

  handleCheckboxChange(event, input) {
    const state = { [input.name]: input.checked };
    this.setState(state);
  }

  handleFormReset() {
    this.setState(TalkEditorComponent.defaultProps);
  }

  renderInputField() {
    return (
      <Grid.Row columns="three" divided>
        <Grid.Column width="eight">
          <Form.Input
            required
            value={this.state.speaker}
            onChange={this.handleInputChange}
            name="speaker"
            icon="user"
            iconPosition="left"
            placeholder="speaker name"
          />

          <Form.Group widths="two">
            <Form.Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              icon="at"
              iconPosition="left"
              placeholder="email adress"
            />
            <Form.Input
              value={this.state.twitter}
              onChange={this.handleInputChange}
              name="twitter"
              icon="twitter"
              iconPosition="left"
              placeholder="twitter id"
            />
          </Form.Group>
        </Grid.Column>

        <Grid.Column width="eight">
          <Form.Input
            required
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            icon="talk"
            iconPosition="left"
            placeholder="talk title"
          />

          <Form.Group widths="two">
            <Form.Input
              value={this.state.video}
              onChange={this.handleInputChange}
              name="video"
              icon="video"
              iconPosition="left"
              placeholder="video link"
            />
            <Form.Input
              value={this.state.slides}
              onChange={this.handleInputChange}
              name="slides"
              icon="image"
              iconPosition="left"
              placeholder="slides link"
            />
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderActionsBar() {
    const submitButton = (
      <Button type="submit" positive icon>
        <Icon name="checkmark" />
        { this.props.updateMode ? 'Update' : 'Save' }
      </Button>
    );

    const removeButton = this.state.destroy
      ? (
        <Button type="submit" negative icon>
          <Icon name="remove" /> Destroy
        </Button>
        )
      : null;

    const resetButton = (
      <Button
        type="reset"
        icon
        onClick={this.handleCancel}
      >
        <Icon name="remove" /> Cancel
      </Button>
    );

    const destroyCheckbox = (
      <Form.Field>
        <Checkbox
          toggle
          label="Remove"
          name="destroy"
          checked={this.state.destroy}
          onChange={this.handleCheckboxChange}
        />
      </Form.Field>
    );

    return (
      <Grid.Row textAlign="right">
        <Grid.Column width="three">
          {this.props.updateMode ? destroyCheckbox : null}
        </Grid.Column>
        <Grid.Column width="thirteen">
          <Button.Group size="mini">
            {removeButton || submitButton}
            <Button.Or />
            {resetButton}
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        onReset={this.handleFormReset}
        size="mini"
      >
        <Grid>
          {this.renderInputField()}
          {this.renderActionsBar()}
        </Grid>
      </Form>
    );
  }
}

export default TalkEditorComponent;
