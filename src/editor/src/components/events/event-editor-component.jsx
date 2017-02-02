import React, { PropTypes } from 'react';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventsEditor(props) {
  const onSubmit = (event, { formData }) => {
    event.preventDefault();
    props.onSave(formData);
  };

  return (
    <Form onSubmit={onSubmit} >
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h2"
              block
            >
              {props.create ? "Create" : "Update"}
              <Button.Group
                size="mini"
                floated="right"
              >
                <Button
                  primary
                  as={Link}
                  to="/"
                  content="Cancel"
                  icon="cancel"
                />
                <Button
                  positive
                  content="Save"
                  icon="checkmark"
                />
              </Button.Group>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input
              label="name"
              name="name"
              defaultValue={props.name}
            />
            <Form.Group widths="equal">
              <Form.Field
                label="Start"
                name="startDate"
                control="input"
                type="date"
                defaultValue={props.startDate}
              />
              <Form.Field
                label="End"
                name="endDate"
                control="input"
                type="date"
                defaultValue={props.endDate}
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

EventsEditor.defaultProps = {
  create: false,
  name: 'Event name',
};

EventsEditor.propTypes = {
  create: PropTypes.bool,
  name: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default EventsEditor;
