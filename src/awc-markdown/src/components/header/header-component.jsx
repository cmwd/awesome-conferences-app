import React, { PropTypes } from 'react';
import { Button, Menu, Modal } from 'semantic-ui-react';

import Importer from '../importer/importer-container';

function HeaderComponent(props) {
  return (
    <Menu>
      <Importer />
      <Menu.Item
        name="reset"
        icon="refresh"
        position="right"
        onClick={props.resetState}
      />
    </Menu>
  );
}

HeaderComponent.propTypes = {
  resetState: PropTypes.func.isRequired,
};

export default HeaderComponent;

