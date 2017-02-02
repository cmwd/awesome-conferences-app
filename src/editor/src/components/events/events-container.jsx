import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import EventsComponent from './events-component';

const INITIAL_STATE = {
  events: [],
};

class EventsContainer extends Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.find = this.find.bind(this);
    this.state = INITIAL_STATE;
  }

  find(uuid) {
    return this.state.events.find(event =>
      event.uuid === uuid);
  }

  createEvent(props) {
    const event = Object.assign({}, { uuid: uniqueId('event-') }, props);
    this.setState(({ events }) =>
      ({ events: [event, ...events] }));
  }

  removeEvent(uuid) {
    this.setState(({ events }) => ({
      events: events.filter(event => event.uuid !== uuid),
    }));
  }

  updateEvent(event) {
    this.setState(
      ({ events }) => ({
        events: events.map(stateEvent =>
          stateEvent.uuid === event.uuid ? event : stateEvent),
      }));
  }

  render() {
    return (
      <EventsComponent
        {...this.state}
        find={this.find}
        createEvent={this.createEvent}
        updateEvent={this.updateEvent}
        removeEvent={this.removeEvent}
      />
    );
  }
}

export default EventsContainer;

