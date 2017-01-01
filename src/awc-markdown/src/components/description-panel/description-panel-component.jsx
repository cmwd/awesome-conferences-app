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
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="url"
            icon="home"
            placeholder="www"
            value={props.url}
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
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="twitterId"
            icon="twitter"
            placeholder="twitter id"
            value={props.twitterId}
            onChange={props.updateDescription}
          />
          <Form.Input
            type="text"
            name="facebookId"
            icon="facebook"
            placeholder="facebook account"
            value={props.facebookId}
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
  updateDescription: PropTypes.func.isRequired,
};

export default DescriptionPanelComponent;

