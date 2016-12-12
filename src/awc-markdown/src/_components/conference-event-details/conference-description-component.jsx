import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

function ConferenceDescription(props) {
  const {
    updateEventDescription,
    uuid,
    name,
    startDate,
    endDate,
  } = props;

  const commonDescriptionProps = {
    fluid: true,
    onChange: (event, { name: fieldName, value }) =>
      updateEventDescription(uuid, { [fieldName]: value }),
  };

  return (
    <Form size="mini">
      <Grid>
        <Grid.Row>
          <Grid.Column width="16">
            <Form.Input
              {...commonDescriptionProps}
              required
              label="Event name"
              type="text"
              name="name"
              value={name}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="8">
            <Form.Input
              required
              value={startDate}
              label="Start date"
              type="date"
              name="startDate"
              {...commonDescriptionProps}
            />
          </Grid.Column>
          <Grid.Column width="8" floated="right">
            <Form.Input
              required
              {...commonDescriptionProps}
              label="End date"
              type="date"
              name="endDate"
              value={endDate}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

ConferenceDescription.defaultProps = {
  name: '',
  startDate: '',
  endDate: '',
};

export default ConferenceDescription;
