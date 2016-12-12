import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class EventTalks extends Component {
  state = {
    speaker: 'asd',
    title: 'asd',
  };

  render() {
    return (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <span>{this.state.speaker}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{this.state.title}</span>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                icon="edit"
                color="orange"
                size="mini"
                content="edit"
                // onClick={this.toggleEditMode}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}


export default EventTalks;
