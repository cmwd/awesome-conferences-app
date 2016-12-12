import React from 'react';
import { Form, Grid } from 'semantic-ui-react';

export default function Fields(props) {
  return (
    <Grid.Row columns="3" divided>
      <Grid.Column width="8">
        <Form.Input
          required
          label="Speaker name"
          value={props.speaker}
          onChange={props.onFieldChange}
          name="speaker"
          icon="user"
          iconPosition="left"
        />

        <Form.Group widths="2">
          <Form.Input
            value={props.email}
            onChange={props.onFieldChange}
            name="email"
            icon="at"
            iconPosition="left"
            placeholder="email adress"
          />
          <Form.Input
            value={props.twitterId}
            onChange={props.onFieldChange}
            name="twitterId"
            icon="twitter"
            iconPosition="left"
            placeholder="twitter id"
          />
        </Form.Group>
      </Grid.Column>

      <Grid.Column width="8">
        <Form.Input
          required
          label="Talk title"
          value={props.title}
          onChange={props.onFieldChange}
          name="title"
          icon="talk"
          iconPosition="left"
        />

        <Form.Group widths="2">
          <Form.Input
            value={props.video}
            onChange={props.onFieldChange}
            name="video"
            icon="video"
            iconPosition="left"
            placeholder="video link"
          />
          <Form.Input
            value={props.slides}
            onChange={props.onFieldChange}
            name="slides"
            icon="image"
            iconPosition="left"
            placeholder="slides link"
          />
        </Form.Group>
      </Grid.Column>
    </Grid.Row>
  );
}
