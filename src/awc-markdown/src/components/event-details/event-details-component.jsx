import React, { Component, PropTypes } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';

import EventTalks from '../event-talks/event-talks-component';
import { updateEvent, getTalks } from 'store';

class EventDetailsComponent extends Component {
  static defaultProps = {
    name: 'Event name',
    startDate: '',
    endDate: '',
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  };

  handleChange= (event, { name, value }) => {
    updateEvent(this.props.uuid, { [name]: value });
  }

  render() {
    return (
      <Form
        size="mini"
      >
        <Form.Input
          type="text"
          value={this.props.name}
          name="name"
          label="Event name"
          onChange={this.handleChange}
        />
        <Grid>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="date"
              value={this.props.startDate}
              name="startDate"
              label="Start date"
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="date"
              value={this.props.endDate}
              name="endDate"
              label="End date"
              min={this.props.startDate}
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width="16">
              <Header as="h5" content="Talks" />
              <EventTalks
                talks={getTalks(this.props.uuid)}
                uuid={this.props.uuid}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default EventDetailsComponent;
