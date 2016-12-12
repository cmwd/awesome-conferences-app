import React from 'react';
import { Grid, Divider, Table, Header } from 'semantic-ui-react';
import classnames from 'classnames';

import { Talk, TalkEditor } from 'components';
import ConferenceDescription from './conference-description-component';
import './conference-event-details.css';
// import { Geolocation } from 'components';

const CSS_BLOCK_NAME = 'conference-event-details';

function ConferenceEventDetails(props) {
  const {
    createEventTalk,
    destroyEventTalk,
    updateEventTalk,
    updateEventDescription,
    uuid,
    talks,
    description,
    last,
    ui,
  } = props;

  const handleTalkAction = actionFn => talkDetails =>
    actionFn(uuid, talkDetails);
  const className = classnames(CSS_BLOCK_NAME, {
    [`${CSS_BLOCK_NAME}--active`]: ui.active,
  });

  return (
    <section className={className}>
      <ConferenceDescription
        {...description}
        uuid={uuid}
        updateEventDescription={updateEventDescription}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width="16">
            <Header as="h4" content="Talks" dividing />
            <Table>
              <Table.Body>
                {talks.map(talk =>
                  (<Talk
                    key={talk.uuid}
                    {...talk}
                    updateTalk={handleTalkAction(updateEventTalk)}
                    destroyTalk={handleTalkAction(destroyEventTalk)}
                  />))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4" content="Add new talk" dividing />
            <TalkEditor
              componentMode={TalkEditor.COMPONENT_MODE.CREATE}
              createTalk={handleTalkAction(createEventTalk)}
            />
          </Grid.Column>
        </Grid.Row>
        {!last ? <Divider /> : null}
      </Grid>
    </section>
  );
}

export default ConferenceEventDetails;
