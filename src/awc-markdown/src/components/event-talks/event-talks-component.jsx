import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'semantic-ui-react';

import EventTalk from 'components/event-talk/event-talk-component';
import { createTalk } from 'store';

const toggleEditMode = ({ editMode }) => ({ editMode: !editMode });

class EventTalks extends Component {
  static propTypes = {
    talks: PropTypes.array.isRequired,
    uuid: PropTypes.string.isRequired,
  };

  state = {
    editMode: false,
  };

  handleContentChanged = (event) => {
    console.log(event);
  }

  render() {
    return (
      <Table>
        <Table.Body>
          {this.props.talks.map(talkInfo => console.log(talkInfo) ||
            (
            <EventTalk
              {...talkInfo}
              key={talkInfo.uuid}
              editMode={this.state.editMode}
              containerWrapper={Table.Row}
              itemWrapper={Table.Cell}
              onActionButtonTriggered={() => this.setState(toggleEditMode)}
              onContentChanged={this.handleContentChanged}
            />
            ))
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3} textAlign="right">
              <Button
                content="Add talk"
                onClick={
                  (evt) => {
                    evt.preventDefault();
                    createTalk(this.props.uuid);
                  }
                }
              />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default EventTalks;
