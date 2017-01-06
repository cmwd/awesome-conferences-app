import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

import MenuItemComponent from './menu-item-component';

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
          <MenuItemComponent
            name={event.name}
            key={event.uuid}
            uuid={event.uuid}
            onClick={() => props.selectEvent(index)}
            removeEvent={props.removeEvent}
            index={index}
            active={props.selectedEventIndex === index}
          />)
      }
    </Menu>
  );
}

const eventShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.uuid,
});

EventsPanelSidebar.propTypes = {
  events: PropTypes.arrayOf(eventShape).isRequired,
  selectedEventIndex: PropTypes.number.isRequired,
  selectEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default EventsPanelSidebar;
