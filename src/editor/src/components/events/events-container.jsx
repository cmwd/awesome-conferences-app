import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import { Route, Switch, Redirect } from 'react-router-dom';
import EventsTable from './events-table-component';
import EventEditor from './event-editor-component';

const INITIAL_STATE = {
  events: [],
};

class EventsContainer extends Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.createEventComponent = this.createEventComponent.bind(this);
    this.updateEventComponent = this.updateEventComponent.bind(this);
    this.eventsListComponent = this.eventsListComponent.bind(this);
    this.state = INITIAL_STATE;
  }

  createEvent(props) {
    const event = Object.assign({}, { uuid: uniqueId('event-') }, props);
    this.setState(({ events }) => ({ events: [event, ...events] }));
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

  createEventComponent(route) {
    const onSave = (event) => {
      this.createEvent(event);
      route.push('/');
    };

    return (<EventEditor
      path={route.path}
      onSave={onSave}
      uuid={uniqueId('event-')}
      create
    />);
  }

  updateEventComponent(route) {
    const { uuid } = route.match.params;
    const event = this.state.events.find(e => e.uuid === uuid);
    const onSave = (newEventState) => {
      this.updateEvent(Object.assign({ uuid }, newEventState));
      route.push('/');
    };

    return event
      ? (<EventEditor {...event} path={`/${uuid}`} onSave={onSave} />)
      : (<Redirect to="/create" />);
  }

  eventsListComponent() {
    return (
      <EventsTable {...this.state} removeEvent={this.removeEvent} />
    );
  }

  render() {
    return (
      <Switch>
        <Route path="/create" component={this.createEventComponent} />
        <Route path="/:uuid" component={this.updateEventComponent} />
        <Route path="/" component={this.eventsListComponent} />
      </Switch>
    );
  }
}

export default EventsContainer;

