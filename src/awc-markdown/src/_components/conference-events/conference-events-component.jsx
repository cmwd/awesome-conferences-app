import React from 'react';
import { Button, Grid, Menu } from 'semantic-ui-react';

import { ConferenceEventDetails } from 'components';
import { LayoutSection } from 'layouts';

function ConferenceEvent(props) {
  const {
    events,
    uuid,
    createEvent,
    updateEventDescription,
    createEventTalk,
    updateEventTalk,
    destroyEventTalk,
  } = props;

  const menuItems = events.map(({ description, ui }) => ({
    name: description.name,
    active: ui.active,
  }));

  return (
    <LayoutSection name="events">
      <Grid.Row>
        <Grid.Column width="16">
          <Menu items={menuItems} />
          {
            events.map((event, index) =>
              (<ConferenceEventDetails
                {...event}
                key={event.uuid}
                updateEventDescription={updateEventDescription}
                createEventTalk={createEventTalk}
                updateEventTalk={updateEventTalk}
                destroyEventTalk={destroyEventTalk}
                last={index === events.length - 1}
              />))
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          <Button
            size="mini"
            floated="right"
            content="Add event"
            positive
            onClick={() => createEvent()}
          />
        </Grid.Column>
      </Grid.Row>
    </LayoutSection>
  );
}

export default ConferenceEvent;
