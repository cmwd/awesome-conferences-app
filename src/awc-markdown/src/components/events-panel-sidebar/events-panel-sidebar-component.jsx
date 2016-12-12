import React from 'react';
import { Menu } from 'semantic-ui-react';

function Controllbar(props) {
  const {
    items,
    addEvent,
    setCurrent,
    activeIndex,
  } = props;

  return (
    <Menu vertical fluid secondary defaultActiveIndex={0}>
      <Menu.Item
        name="Add event"
        icon="add"
        onClick={addEvent}
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

Controllbar.defaultProps = {
  items: [],
};

export default Controllbar;
