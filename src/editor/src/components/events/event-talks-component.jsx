import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


function EventTalks(props) {
  console.log(props);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Button
            as={Link}
            to={`${props.path}/talk/add`}
            content="add"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default EventTalks;

