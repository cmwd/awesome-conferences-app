import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import { TalkEditor } from 'components';

export default class Talk extends Component {
  static defaultProps = {
    editMode: false,
  }

  constructor(props) {
    super(props);
    this.state = props;
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps);
  }

  getAvatar() {
    const { twitterId } = this.state;
    return twitterId.length > 0
      ? `https://twitter.com/${twitterId}/profile_image?size=bigger`
      : 'http://semantic-ui.com/images/avatar/small/elliot.jpg';
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    const { editMode, speaker, title } = this.state;

    if (editMode) {
      return (
        <Table.Row>
          <Table.Cell colSpan="3">
            <TalkEditor
              {...this.state}
              onUpdate={this.props.updateTalk}
              onDestroy={this.props.destroyTalk}
              onClose={this.toggleEditMode}
              componentMode={TalkEditor.COMPONENT_MODE.UPDATE}
            />
          </Table.Cell>
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        <Table.Cell>{speaker}</Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>
          <Button
            icon="edit"
            color="orange"
            size="mini"
            floated="right"
            onClick={this.toggleEditMode}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

