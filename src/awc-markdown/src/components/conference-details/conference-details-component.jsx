import React, { Component } from 'react';
import { Container, Form, Input, TextArea, Grid, Divider, Header } from 'semantic-ui-react';

import { LayoutSection } from 'layouts';

function ConferenceDetails(props) {
  const commonProps = {
    fluid: true,
    onChange: ({ target: { value, name } }) =>
      props.updateConferenceInfo({ [name]: value }),
  };

  return (
    <LayoutSection name="details" header="" wrapper={Form}>
      <Grid.Row>
        <Grid.Column width="16">
          <Form.Input
            required
            label="Conference name"
            type="text"
            name="name"
            value={props.name}
            {...commonProps}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="16">
            <TextArea rows="4" name="description"
              onChange={commonProps.onChange}
              value={props.description}
            />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row>
        <Grid.Column width="8">
          <Input type="text" name="url" icon="home" placeholder="www"
            value={props.url} {...commonProps}
          />
          <Input type="text" name="email" icon="at" placeholder="e-mail"
            value={props.email} {...commonProps}
          />
        </Grid.Column>
        <Grid.Column width="8">
          <Input type="text" name="twitterId" icon="twitter"
            placeholder="twitter id" value={props.twitterId}
            {...commonProps}
          />
          <Input type="text" name="facebookId" icon="facebook"
            placeholder="facebook account"
            value={props.facebookId} {...commonProps}
          />
        </Grid.Column>
      </Grid.Row>
    </LayoutSection>
  );
}

ConferenceDetails.defaultProps = {
  name: '',
  description: 'Enter conference description',
  email: '',
  url: '',
  twitterId: '',
  facebookId: '',
};

export default ConferenceDetails;
