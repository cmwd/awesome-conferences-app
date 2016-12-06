import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

function SpeakersList(props) {
  console.log(props);
      // <TableBody {...props} />
      // <TableFooter {...props} />
  return (
    <Table columns="two" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Speaker</Table.HeaderCell>
          <Table.HeaderCell>Talk</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
    </Table>
  );
}

export default SpeakersList;
