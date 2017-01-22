import React, { PropTypes } from 'react';
import { Form, Grid } from 'semantic-ui-react';

function DescriptionPanelComponent(props) {
  return (
    <Form size="mini">
      <Form.Input
        required
        label="Conference name"
        type="text"
        name="name"
        value={props.name}
        onChange={props.updateDescription}
      />
      <Form.TextArea
        rows="3"
        name="description"
        label="Conference description"
        value={props.description}
        onChange={props.updateDescription}
      />
      <Grid>
        <Grid.Column
          computer="8"
          tablet="8"
          mobile="16"
        >
          <Form.Input
            type="text"
            name="web"
            icon="home"
            placeholder="www"
            value={props.web}
            onChange={props.updateDescription}
          />
          <Form.Input
            type="text"
            name="email"
            icon="at"
            placeholder="e-mail"
            value={props.email}
            onChange={props.updateDescription}
          />
        </Grid.Column>
        <Grid.Column
          computer="8"
          tablet="8"
          mobile="16"
        >
          <Form.Input
            type="text"
            name="twitter_id"
            icon="twitter"
            placeholder="twitter id"
            value={props.twitter_id}
            onChange={props.updateDescription}
          />
          <Form.Input
            type="text"
            name="facebook_id"
            icon="facebook"
            placeholder="facebook account"
            value={props.facebook_id}
            onChange={props.updateDescription}
          />
        </Grid.Column>
      </Grid>
    </Form>
  );
}

DescriptionPanelComponent.defaultProps = {
  name: '',
  description: '',
  web: '',
  email: '',
  twitter_id: '',
  facebook_id: '',
};

DescriptionPanelComponent.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  web: PropTypes.string,
  email: PropTypes.string,
  twitter_id: PropTypes.string,
  facebook_id: PropTypes.string,
  updateDescription: PropTypes.func.isRequired,
};

export default DescriptionPanelComponent;

