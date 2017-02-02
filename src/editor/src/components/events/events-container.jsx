import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import EventsComponent from './events-component';

const INITIAL_STATE = {
  events: [],
};

class EventsPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.state = INITIAL_STATE;
  }

  createEvent(props) {
    const event = Object.assign({}, { uuid: uniqueId('uuid-') }, props);
    this.setState(({ events }) =>
      ({ events: [event, ...events] }));
  }

  removeEvent(uuid) {
    this.setState(({ events }) => ({
      events: events.filter(event => event.uuid !== uuid),
    }));
  }

  updateEvent(uuid, prop) {
    this.setState(
      ({ events }) => ({
        events: events.map(event =>
          event.uuid === uuid ? { ...event, ...prop } : event),
      }));
  }

  render() {
    return (
      <EventsComponent
        {...this.state}
        createEvent={this.createEvent}
        updateEvent={this.updateEvent}
        removeEvent={this.removeEvent}
      />
    );
  }
}

export default EventsPanelContainer;

