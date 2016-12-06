import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

import { ConferenceEventComponent } from 'components';

function SectionEventsComponent(props) {
  return (
    <Container>
      <Header as="h3" icon="calendar" content="Conference events" />
      <Button content="add new" onClick={() => props.createEvent()}/>
      {
        props.events.map(event =>
            (<ConferenceEventComponent key={event.uuid} uuid={event.uuid} />))
      }
    </Container>
  );
}

export default SectionEventsComponent;
