import React, { PropTypes } from 'react';
import { Form, Grid } from 'semantic-ui-react';

function DescriptionPanelComponent(props) {
  return (
    <Form size="mini">
      <Form.Input
        required
        label="Conference name"
        type="text"
        name="conference_name"
        value={props.conference_name}
        onChange={props.updateDescription}
      />
      <Form.TextArea
        rows="3"
        name="conference_description"
        label="Conference description"
        value={props.conference_description}
        onChange={props.updateDescription}
      />
      <Grid>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="conference_web"
            icon="home"
            placeholder="www"
            value={props.conference_web}
            onChange={props.updateDescription}
          />
          <Form.Input
            type="text"
            name="conference_email"
            icon="at"
            placeholder="e-mail"
            value={props.conference_email}
            onChange={props.updateDescription}
          />
        </Grid.Column>
        <Grid.Column tablet="8" mobile="16">
          <Form.Input
            type="text"
            name="conference_twitter_id"
            icon="twitter"
            placeholder="twitter id"
            value={props.conference_twitter_id}
            onChange={props.updateDescription}
          />
          <Form.Input
            type="text"
            name="conference_facebook_id"
            icon="facebook"
            placeholder="facebook account"
            value={props.conference_facebook_id}
            onChange={props.updateDescription}
          />
        </Grid.Column>
      </Grid>
    </Form>
  );
}

DescriptionPanelComponent.defaultProps = {
  conference_name: '',
  conference_description: '',
  conference_web: '',
  conference_email: '',
  conference_twitter_id: '',
  conference_facebook_id: '',
};

DescriptionPanelComponent.propTypes = {
  conference_name: PropTypes.string,
  conference_description: PropTypes.string,
  conference_web: PropTypes.string,
  conference_email: PropTypes.string,
  conference_twitter_id: PropTypes.string,
  conference_facebook_id: PropTypes.string,
  updateDescription: PropTypes.func.isRequired,
};

export default DescriptionPanelComponent;

