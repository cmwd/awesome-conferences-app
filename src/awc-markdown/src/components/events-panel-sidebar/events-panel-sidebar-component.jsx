import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

function EventsPanelSidebar(props) {
  return (
    <Menu vertical fluid secondary defaultActiveIndex={0}>
      <Menu.Item
        name="Add event"
        icon="add"
        onClick={() => props.createEvent()}
      />
      {
        props.events.map((event, index) =>
          <Menu.Item
            name={event.event_name}
            key={event.uuid}
            onClick={() => props.selectEvent(index)}
            index={index}
            active={props.selectedEventIndex === index}
          />)
      }
    </Menu>
  );
}

EventsPanelSidebar.propTypes = {
  events: PropTypes.array.isRequired,
  selectedEventIndex: PropTypes.number.isRequired,
  selectEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
};

export default EventsPanelSidebar;
