import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import TalkEditorComponent from './talk-editor-component';
import { addTalk, updateTalk, destroyTalk } from './talks-actions';

function InputModeButton(props) {
  return (
    <Button
      icon labelPosition="left" primary size="small" size="mini" floated="right"
      onClick={props.toggleInputMode} >
      <Icon name="plus" /> Add talk
    </Button>
  );
}

function TableRowFullWidth({ children }) {
  return (
    <Table.Row>
      <Table.Cell colSpan="3">{children}</Table.Cell>
    </Table.Row>
  );
}

function TalkEntryEditor(props) {
  return (
    <TalkEditorComponent
      {...props.talk}
      updateMode={props.updateMode}
      onSubmit={(talkObj) => props.updateEntry(talkObj, props.talk.key)}
      onDestroy={(talkObj) => props.destroyEntry(talkObj, props.talk.key)}
      onCancel={() => props.toggleEditMode(props.talk.key)}
    />
  );
}

function TalkEntry({ toggleEditMode, talk }) {
  return (
    <Table.Row key={talk.key}>
      <Table.Cell>{talk.speaker}</Table.Cell>
      <Table.Cell>{talk.title}</Table.Cell>
      <Table.Cell>
        <Button
          size="mini" floated="right" color="orange" icon="edit" circular
          onClick={() => toggleEditMode(talk.key)} />
      </Table.Cell>
    </Table.Row>
  );
}

function TableBody(props) {
  const hasEditModeEnabled = ({ key }) => props.ui.editEntries.includes(key);

  const rows = props.entries
    .map(talk =>
      hasEditModeEnabled(talk)
        ? (
            <TableRowFullWidth>
              <TalkEntryEditor
                key={talk.key} talk={talk} updateMode {...props} />
            </TableRowFullWidth>
          )
        : (<TalkEntry key={talk.key} talk={talk} {...props} />));

  return (
    <Table.Body>{rows}</Table.Body>
  );
}

function TableFooter(props) {
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          {
            props.ui.inputMode
              ? <TalkEditorComponent
                  onSubmit={this.props.addNewEntry}
                  onCancel={this.props.toggleInputMode}
                />
              : <InputModeButton {...props} />
          }
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
}

function TableLayout(props) {
  return (
    <Table columns="two" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Speaker</Table.HeaderCell>
          <Table.HeaderCell>Talk</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <TableBody {...props} />
      <TableFooter {...props} />
    </Table>
  );
}

export default TableLayout;
