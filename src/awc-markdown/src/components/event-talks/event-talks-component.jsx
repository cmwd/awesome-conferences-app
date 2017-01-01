import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'semantic-ui-react';

import EventTalkComponent from 'components/event-talk/event-talk-component';

const toggleEditMode = ({ editMode }) => ({ editMode: !editMode });

function EventTalksComponent(props) {
  return (
    <Table>
      <Table.Body>
        {props.talks.map(talkInfo =>
          (
          <EventTalkComponent
            {...talkInfo}
            key={talkInfo.uuid}
            containerWrapper={Table.Row}
            itemWrapper={Table.Cell}
            updateTalk={props.updateTalk}
            removeTalk={props.removeTalk}
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
                  props.createTalk(EventTalkComponent.defaultProps);
                }
              }
            />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

EventTalksComponent.defaultProps = {
  talks: [],
};

EventTalksComponent.propTypes = {
  talks: PropTypes.array,
  parentUuid: PropTypes.string.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default EventTalksComponent;
