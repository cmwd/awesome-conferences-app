import React, { PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';

import EventDetails
  from '../event-details/event-details-component';
import PanelSidebar
  from '../events-panel-sidebar/events-panel-sidebar-component';

function EventsPanelComponent(props) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="4">
          <PanelSidebar
            events={props.events}
            selectedUuid={props.selectedUuid}
            selectEvent={props.selectEvent}
            createEvent={props.createEvent}
            removeEvent={props.removeEvent}
          />
        </Grid.Column>
        <Grid.Column width="12">
          {
            props.selectedEvent
              ? <EventDetails
                {...props.selectedEvent}
                key={props.selectedEvent.uuid}
                updateEvent={
                  eventProps => props.updateEvent(
                    props.selectedEvent.uuid,
                    eventProps
                  )
                }
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
  selectedUuid: PropTypes.string.isRequired,
  selectedEvent: PropTypes.object,
  selectEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default EventsPanelComponent;
