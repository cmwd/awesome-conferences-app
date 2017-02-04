import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import { Route, Switch, Redirect } from 'react-router-dom';
import EventsTable from './events-table-component';
import EventEditor from './event-editor-component';
import EventTalkEditor from './event-talk-editor-component';
import EventTalks from './event-talks-component';

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
    this.eventTalkComponent = this.eventTalkComponent.bind(this);
    this.state = INITIAL_STATE;
  }

  createEvent(props) {
    this.setState(({ events }) => ({ events: [props, ...events] }));
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
    const { path } = route;
    const uuid = uniqueId('event-');

    return (<EventEditor
      path={path}
      onSave={onSave}
      uuid={uuid}
      talksComponent={params =>
        this.renderTalks({ ...params, path, uuid })}
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
    const path = `/${uuid}`;

    return event
      ? (<EventEditor
        {...event}
        path={path}
        onSave={onSave}
        talksComponent={params =>
          this.renderTalks({ ...params, path, uuid })}
      />)
      : (<Redirect to="/create" />);
  }

  eventsListComponent() {
    return (
      <EventsTable {...this.state} removeEvent={this.removeEvent} />
    );
  }

  eventTalkComponent(props) {
    const event = this.state.events.find(e => e.uuid === props.uuid);
    const talks = event ? event.talks : [];

    return (
      <EventTalkEditor previousRoute={props.path} talks={talks} />
    );
  }

  renderTalks(props) {
    return (
      <Switch>
        <Route exact path={props.path} component={EventTalks} />
        <Route
          path={`${props.path}/talk`}
          component={() => this.eventTalkComponent(props)}
        />
        <Route
          path={`${props.path}/:uuid`}
          component={() => this.eventTalkComponent(props)}
        />
      </Switch>
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

