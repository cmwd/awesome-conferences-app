import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

import { ConferenceEventDetails } from 'components';
import { LayoutSection } from 'layouts';

function ConferenceEvent(props) {
  return (
    <LayoutSection name="events" header="Events">
      <Grid.Row>
        <Grid.Column width="16">
          <Button
            size="mini"
            floated="right"
            content="Add event"
            positive
            onClick={() => props.createEvent()}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          {
            props.events.map((event, index) =>
              (<ConferenceEventDetails
                {...event}
                key={event.uuid}
                updateEventDescription={props.updateEventDescription}
                createEventTalk={props.createEventTalk}
                updateEventTalk={props.updateEventTalk}
                destroyEventTalk={props.destroyEventTalk}
                last={index === props.events.length - 1}
              />))
          }
        </Grid.Column>
      </Grid.Row>
    </LayoutSection>
  );
}

export default ConferenceEvent;
