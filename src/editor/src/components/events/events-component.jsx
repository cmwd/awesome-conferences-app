import React, { PropTypes } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventsComponent(props) {
  const addButton = (
    <Button
      positive
      as={Link}
      to={`/event/create`}
      floated="right"
      size="mini"
      icon="plus"
      content="Event"
    />
  );
  const tableBody = props.events.map(event => (
    <Table.Row key={event.uuid}>
      <Table.Cell>{event.name}</Table.Cell>
      <Table.Cell>
        <Button
          primary
          as={Link}
          to={`/event/${event.uuid}`}
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
            () => props.removeEvent(event.uuid)
          }
        />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">{addButton}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableBody}</Table.Body>
    </Table>
  );
}

EventsComponent.propTypes = {
  events: PropTypes.array.isRequired,
  createEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default EventsComponent;
