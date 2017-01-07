import React, { Component } from 'react';
import { uniqueId, omitBy, flowRight, debounce } from 'lodash';

import EventsPanelComponent from './events-panel-component';
import EventDetailsComponent from '../event-details/event-details-component';

const INITIAL_STATE = {
  events: [],
  selectedUuid: '',
};

const isUuid = (value, key) =>
  key === 'uuid';

const sortByDate = (a, b) => {
  const aStart = Date.parse(a.start_date) || 0;
  const bStart = Date.parse(b.start_date) || 0;

  if (aStart > bStart) return -1;
  if (aStart < bStart) return 1;

  return 0;
};

class EventsPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      ...props,
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
    this.setState(INITIAL_STATE, this.props.storeInPersistentState);
  }

  getSelectedEventIndex() {
    const { selectedUuid, events } = this.state;
    return events.findIndex(e => e.uuid === selectedUuid);
  }

  sortEventsByDate = debounce(() => {
    this.setState(
      ({ events }) => ({
        events: events.sort(sortByDate),
      }),
      this.props.storeInPersistentState
    );
  }, 500);

  createEvent = (props = {}) => {
    const event = {
      ...props,
      ...EventDetailsComponent.defaultProps,
      uuid: props.uuid || uniqueId(`uuid-${Date.now()}-`),
    };

    this.setState(
      ({ events }) => ({
        events: [event, ...events],
      }),
      this.props.storeInPersistentState
    );
  };

  removeEvent = uuid => {
    const handler = ({ events: cEvents }) => {
      const events = cEvents.filter(e => e.uuid !== uuid);
      const cIndex = this.getSelectedEventIndex();
      const index = cIndex === events.length ? cIndex - 1 : cIndex;
      const { uuid: selectedUuid } = events[index];

      return { events, selectedUuid };
    };

    this.setState(handler, this.props.storeInPersistentState);
  };

  updateEvent = (uuid, prop) => {
    this.setState(
      ({ events }) => ({
        events: events.map(event =>
          event.uuid === uuid ? { ...event, ...prop } : event),
      }),
      flowRight([this.props.storeInPersistentState, this.sortEventsByDate])
     );
  };

  selectEvent = selectedUuid => {
    this.setState(() => ({ selectedUuid }));
  };

  render() {
    const selectedEvent = this.state.events.find(e =>
      e.uuid === this.state.selectedUuid);

    return (
      <EventsPanelComponent
        {...this.state}
        selectedEvent={selectedEvent}
        createEvent={this.createEvent}
        updateEvent={this.updateEvent}
        selectEvent={this.selectEvent}
        removeEvent={this.removeEvent}
      />
    );
  }
}

export default EventsPanelContainer;

