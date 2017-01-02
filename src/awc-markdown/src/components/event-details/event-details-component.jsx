import React, { PropTypes } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';

import EventTalks from '../event-talks/event-talks-container';

const onChangeProxy = next =>
  (event, { name, value }) =>
    next({ [name]: value });

function EventDetailsComponent(props) {
  return (
    <Form size="mini">
      <Form.Input
        type="text"
        value={props.event_name}
        name="event_name"
        label="Event name"
        onChange={onChangeProxy(props.updateEvent)}
      />
      <Grid>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="date"
            value={props.event_start_date}
            name="event_start_date"
            label="Start date"
            onChange={onChangeProxy(props.updateEvent)}
          />
        </Grid.Column>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="date"
            value={props.event_end_date}
            name="event_end_date"
            label="End date"
            min={props.event_start_date}
            onChange={onChangeProxy(props.updateEvent)}
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width="16">
            <Header as="h5" content="Talks" />
            <EventTalks
              talks={props.talks}
              parentUuid={props.uuid}
              updateEvent={props.updateEvent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

EventDetailsComponent.defaultProps = {
  event_name: 'Event name',
  event_start_date: '',
  event_end_date: '',
  talks: [],
};

EventDetailsComponent.propTypes = {
  uuid: PropTypes.string.isRequired,
  event_name: PropTypes.string,
  event_start_date: PropTypes.string,
  event_end_date: PropTypes.string,
  talks: PropTypes.array,
  updateEvent: PropTypes.func.isRequired,
};

export default EventDetailsComponent;

