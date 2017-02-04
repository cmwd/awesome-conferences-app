import React, { PropTypes } from 'react';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import EventTalks from './event-talks-component';
import EventTalkEditor from './event-talk-editor-component';

function EventsEditor(props) {
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
          <Switch>
            <Route
              exact
              path={props.path}
              component={EventTalks}
            />
            <Route
              path={`${props.path}/talk`}
              component={() => (
                <EventTalkEditor
                  previousRoute={props.path}
                  talks={props.talks}
                />
              )}
            />
            <Route
              path={`${props.path}/:uuid`}
              component={EventTalkEditor}
            />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

EventsEditor.defaultProps = {
  create: false,
  name: 'Event name',
  talks: [],
};

EventsEditor.propTypes = {
  create: PropTypes.bool,
  name: PropTypes.string,
  talks: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default EventsEditor;
