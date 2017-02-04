import React, { PropTypes } from 'react';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventsEditor(props) {
  const {
    talksComponent: TalksComponent,
  } = props;
  const onSubmit = (event, { formData }) => {
    event.preventDefault();
    props.onSave(formData);
  };
  const header = props.create ? 'Create' : 'Update';

  return (
    <Grid>
      <Form
        className="row"
        onSubmit={onSubmit}
      >
        <Form.Input
          type="hidden"
          name="uuid"
          value={props.uuid}
        />
        <Grid.Column width="16">
          <Header
            as="h2"
            block
          >
            {header}
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
        <Grid.Column width="16">
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
      </Form>
      <Grid.Row>
        <Grid.Column>
          <TalksComponent />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

EventsEditor.defaultProps = {
  create: false,
  name: 'Event name',
  startDate: '2017-01-01',
  endDate: '2017-01-02',
};

EventsEditor.propTypes = {
  create: PropTypes.bool,
  name: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  talksComponent: PropTypes.func.isRequired,
};

export default EventsEditor;
