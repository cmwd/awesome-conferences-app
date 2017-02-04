import React, { PropTypes } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import EventsTable from './events-table-component';
import EventEditor from './event-editor-component';

function EventsComponent(props) {
  return (
    <div>
      <Switch>
        <Route
          path="/event/create"
          component={(route) => {
            const onSave = (event) => {
              props.createEvent(event);
              route.push('/');
            };

            return (<EventEditor path={route.path} onSave={onSave} create />);
          }}
        />
        <Route
          path="/event/:uuid"
          component={(route) => {
            const { uuid } = route.match.params;
            const event = props.find(uuid);
            const onSave = (newEventState) => {
              props.updateEvent(Object.assign({ uuid }, newEventState));
              route.push('/');
            };

            return event
              ? (<EventEditor {...event} path={route.path} onSave={onSave} />)
              : (<Redirect to="/event/create" />);
          }}
        />
        <Route
          path="/"
          component={() => (
            <EventsTable {...props} />
          )}
        />
      </Switch>
    </div>
  );
}

EventsComponent.propTypes = {
  find: PropTypes.func.isRequired,
};

export default EventsComponent;

