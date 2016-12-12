import React, { Component } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { omit } from 'lodash';

import EventTalks from '../event-talks/event-talks-component';

class EventDetails extends Component {
  static defaultProps = {
    name: '',
    startDate: '',
    endDate: '',
  };

  constructor(props) {
    super(props);
    this.state = omit(props, ['onChange']);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSave() {
    this.props.onChange(this.state);
  }

  render() {
    const {
      name,
      startDate,
      endDate,
    } = this.state;

    return (
      <Form
        size="mini"
        onBlur={this.handleSave}
      >
        <Form.Input
          type="text"
          value={name}
          name="name"
          label="Event name"
          onChange={this.handleChange}
        />
        <Grid>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="date"
              value={startDate}
              name="startDate"
              label="Start date"
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="date"
              value={endDate}
              name="endDate"
              label="End date"
              min={startDate}
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width="16">
              <Header as="h6" content="Talks" />
              <EventTalks />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default EventDetails;
