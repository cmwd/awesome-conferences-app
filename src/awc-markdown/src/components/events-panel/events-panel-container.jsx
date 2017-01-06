import React, { Component } from 'react';
import { uniqueId, omitBy, debounce } from 'lodash';

import EventsPanelComponent from './events-panel-component';
import EventDetailsComponent from '../event-details/event-details-component';

const PERSISTENT_STATE_KEY = 'events';
const PERSISTENT_STATE_DEBOUNCE_DELAY = 250;
const INITIAL_STATE = {
  events: [],
  selectedEventIndex: 0,
};

const isUuid = (value, key) =>
  key === 'uuid';

class EventsPanelContainer extends Component {
  constructor(props) {
    super(props);

    const persistentState = JSON.parse(
      localStorage.getItem(PERSISTENT_STATE_KEY) || '{}');

    this.state = {
      ...INITIAL_STATE,
      ...persistentState,
    };
  }

  getResult() {
    return this.state.events
      .map(e => ({
        ...omitBy(e, isUuid),
        talks: e.talks.map(t => omitBy(t, isUuid))
      }));
  }

  reset() {
    this.setState(INITIAL_STATE, this.storeInPersistentState);
  }

  storeInPersistentState = debounce(() => {
    localStorage.setItem(PERSISTENT_STATE_KEY, JSON.stringify(this.state));
  }, PERSISTENT_STATE_DEBOUNCE_DELAY);

  createEvent = (props = {}) => {
    const { defaultProps } = EventDetailsComponent;
    const event = {
      ...props,
      ...defaultProps,
      uuid: props.uuid || uniqueId(`uuid-${Date.now()}-`),
    }

    this.setState(
      ({ events }) => ({
        events: [event, ...events],
      }),
      this.storeInPersistentState
    );
  };

  removeEvent = uuid => {
    const handler = ({ events: cEvents, selectedEventIndex: cIndex }) => {
      const events = cEvents.filter(e => e.uuid !== uuid);
      const selectedEventIndex = cIndex === events.length
        ? cIndex - 1
        : cIndex;

      return { events, selectedEventIndex };
    };

    this.setState(handler, this.storeInPersistentState);
  };

  updateEvent = event => {
    this.setState(
      ({ events }) => ({
        events: events.map(e =>
          e.uuid === event.uuid ? event : e),
      }),
      this.storeInPersistentState
     );
  };

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
        removeEvent={this.removeEvent}
      />
    );
  }
}

export default EventsPanelContainer;

