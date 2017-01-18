import React, { PropTypes } from 'react';
import { Menu, Button } from 'semantic-ui-react';

function MenuItemComponent({ removeEvent, uuid, ...props }) {
  return (
    <Menu.Item {...props}>
      <Button
        negative
        compact
        icon="minus"
        size="mini"
        onClick={
          (event) => {
            event.stopPropagation();
            removeEvent(uuid);
          }
        }
      />
      {props.name}
    </Menu.Item>
  );
}

MenuItemComponent.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default MenuItemComponent;

