import React from 'react';
import { Grid, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventTalkEditor(props) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Button
            primary
            as={Link}
            to={props.previousRoute}
            content="Cancel"
            icon="cancel"
            size="mini"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default EventTalkEditor;

