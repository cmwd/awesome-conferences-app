import React from 'react';
import { Container, Header, Divider, Button, Icon } from 'semantic-ui-react';

import { ContentEditable, SpeakersListComponent } from 'components';

function ConferenceEvent(props) {
  const doneAction = payload =>
    props.updateEventDescription(props.uuid, payload);
  const destroyEvent = () =>
    props.destroyEvent(props.uuid);

  return (
    <Container>
      <Divider />
      <Header as="h4">
        <Header.Content>
          <ContentEditable name="name" doneAction={doneAction}>
            {props.description.name}
          </ContentEditable>
          <Button icon="remove" onClick={destroyEvent} />
        </Header.Content>
        <SpeakersListComponent uuid={props.uuid} />
      </Header>
    </Container>
  );
}

export default ConferenceEvent;
