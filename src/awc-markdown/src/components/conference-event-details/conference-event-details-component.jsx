import React from 'react';
import { Input, Grid, Divider } from 'semantic-ui-react';

import { Geolocation } from 'components';

function ConferenceEventDetails(props) {
  console.log(props);
  const commonDescriptionProps = {
    fluid: true,
    onChange: ({ target: { value, name } }) =>
      props.updateEventDescription(props.uuid, { [name]: value })
  };

  return (
    <article>
      <Grid>
        <Grid.Row>
          <Grid.Column width="16">
            <Input type="text" name="name" value={props.description.name}
              {...commonDescriptionProps}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="7">
            <Input label="start" type="date" name="startDate"
              value={props.description.startDate}
              {...commonDescriptionProps}
            />
          </Grid.Column>
          <Grid.Column width="7" floated="right">
            <Input label="end" type="date" name="endDate"
              value={props.description.endDate}
              {...commonDescriptionProps}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Geolocation {...props} />
        </Grid.Row>
      </Grid>
      {
        !props.last
          ? (<Divider />)
          : null
      }
    </article>
  );
}

export default ConferenceEventDetails;
