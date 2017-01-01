import React, { PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';

import EventDetails
  from '../event-details/event-details-container';
import PanelSidebar
  from '../events-panel-sidebar/events-panel-sidebar-component';

function EventsPanelComponent(props) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="4">
          <PanelSidebar
            events={props.events}
            selectedEventIndex={props.selectedEventIndex}
            selectEvent={props.selectEvent}
            createEvent={props.createEvent}
          />
        </Grid.Column>
        <Grid.Column width="12">
          {
            props.selectedEvent
              ? <EventDetails
                {...props.selectedEvent}
                key={props.selectedEvent.uuid}
                updateEvent={props.updateEvent}
              />
              : null
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

EventsPanelComponent.propTypes = {
  events: PropTypes.array.isRequired,
  selectedEventIndex: PropTypes.number.isRequired,
  selectedEvent: PropTypes.object,
  selectEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default EventsPanelComponent;
