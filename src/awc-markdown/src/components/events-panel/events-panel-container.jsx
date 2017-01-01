import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import EventsPanelComponent from './events-panel-component';

class EventsPanelContainer extends Component {
  state = {
    events: [],
    selectedEventIndex: 0,
  };

  createEvent = (props = { uuid: uniqueId('uuid-') }) => {
    this.setState(({ events }) => ({
      events: [props, ...events],
    }));
  };

  updateEvent = event => {
    this.setState(({ events }) => ({
      events: events.map(e =>
        e.uuid === event.uuid ? event : e
      ),
    }));
  }

  selectEvent = selectedEventIndex => {
    this.setState(() => ({ selectedEventIndex }));
  };

  render() {
    return (
      <EventsPanelComponent
        {...this.state}
        selectedEvent={this.state.events[this.state.selectedEventIndex]}
        createEvent={this.createEvent}
        updateEvent={this.updateEvent}
        selectEvent={this.selectEvent}
      />
    );
  }
}

export default EventsPanelContainer;

