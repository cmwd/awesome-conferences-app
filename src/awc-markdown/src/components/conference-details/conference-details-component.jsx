import React, { Component } from 'react';
import { Container, Form, Input, TextArea, Grid, Divider, Header } from 'semantic-ui-react';

import { LayoutSection } from 'layouts';

/**
 * - name
 * - description
 * - www
 * - twitter
 * - facebook
 * - banner
 * - logo
 */

function ConferenceDetails(props) {
  const commonProps = {
    fluid: true,
    onChange: ({ target: { value, name } }) =>
      props.updateConferenceInfo({ [name]: value })
  };

  return (
    <LayoutSection name="details" header="Details" wrapper={Form}>
      <Grid.Row>
        <Grid.Column width="16">
          <Input type="text" name="name" value={props.conference.name}
            {...commonProps}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="16">
            <TextArea rows="4" name="description"
              onChange={commonProps.onChange}
              value={props.conference.description}
            />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row>
        <Grid.Column width="8">
          <Input type="text" name="url" icon="home" placeholder="www"
            value={props.conference.url} {...commonProps}
          />
          <Input type="text" name="email" icon="at" placeholder="e-mail"
            value={props.conference.email} {...commonProps}
          />
        </Grid.Column>
        <Grid.Column width="8">
          <Input type="text" name="twitterId" icon="twitter"
            placeholder="twitter id" value={props.conference.twitterId}
            {...commonProps}
          />
          <Input type="text" name="facebookId" icon="facebook"
            placeholder="facebook account"
            value={props.conference.facebookId} {...commonProps}
          />
        </Grid.Column>
      </Grid.Row>
    </LayoutSection>
  );
}

export default ConferenceDetails;
