import React, { PropTypes } from 'react';
import { Table, Button, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function TableRow(props) {
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>
        <Button
          primary
          as={Link}
          to={`/${props.uuid}`}
          floated="right"
          size="mini"
          icon="edit"
          content="edit"
        />
        <Button
          negative
          floated="right"
          size="mini"
          icon="minus"
          onClick={
            () => props.removeEvent(props.uuid)
          }
        />
      </Table.Cell>
    </Table.Row>
  );
}

TableRow.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

function EventsTableComponent(props) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header
            as="h2"
            block
          >
            Events
            <Button
              positive
              as={Link}
              to={'/create'}
              floated="right"
              size="mini"
              icon="plus"
              content="Event"
            />
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Table>
            <Table.Body>
              {props.events.map(event => (
                <TableRow
                  {...event}
                  key={event.uuid}
                  removeEvent={props.removeEvent}
                />
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

EventsTableComponent.propTypes = {
  events: PropTypes.array,
};

export default EventsTableComponent;

