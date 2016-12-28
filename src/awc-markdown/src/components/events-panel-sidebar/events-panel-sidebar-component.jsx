import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';
import { createEvent } from 'store';

function EventsPanelSidebar(props) {
  const {
    items,
    setCurrent,
    activeIndex,
  } = props;

  return (
    <Menu vertical fluid secondary defaultActiveIndex={0}>
      <Menu.Item
        name="Add event"
        icon="add"
        onClick={() => createEvent()}
      />
      {
        items.map((event, index) =>
          <Menu.Item
            name={event.name}
            key={event.uuid}
            onClick={() => setCurrent(index)}
            index={index}
            active={activeIndex === index}
          />)
      }
    </Menu>
  );
}

EventsPanelSidebar.defaultProps = {
  items: [],
};

EventsPanelSidebar.propTypes = {
  items: PropTypes.array,
  setCurrent: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
};

export default EventsPanelSidebar;
