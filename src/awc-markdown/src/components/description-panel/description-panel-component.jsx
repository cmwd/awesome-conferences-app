import React, { PropTypes } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import { updateDescription } from 'store';

function DescriptionPanelComponent(props) {
  return (
    <Form
      size="mini"
      onChange={(event) => {
        const { name, value } = event.target;
        updateDescription({ [name]: value });
      }}
    >
      <Form.Input
        required
        label="Conference name"
        type="text"
        name="name"
        value={props.name}
      />
      <Form.TextArea
        rows="3"
        name="description"
        label="Conference description"
        value={props.description}
      />
      <Grid>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="url"
            icon="home"
            placeholder="www"
            value={props.url}
          />
          <Form.Input
            type="text"
            name="email"
            icon="at"
            placeholder="e-mail"
            value={props.email}
          />
        </Grid.Column>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="twitterId"
            icon="twitter"
            placeholder="twitter id"
            value={props.twitterId}
          />
          <Form.Input
            type="text"
            name="facebookId"
            icon="facebook"
            placeholder="facebook account"
            value={props.facebookId}
          />
        </Grid.Column>
      </Grid>
    </Form>
  );
}

DescriptionPanelComponent.defaultProps = {
  name: '',
  description: '',
  url: '',
  email: '',
  twitterId: '',
  facebookId: '',
};

DescriptionPanelComponent.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  email: PropTypes.string,
  twitterId: PropTypes.string,
  facebookId: PropTypes.string,
};

export default DescriptionPanelComponent;

