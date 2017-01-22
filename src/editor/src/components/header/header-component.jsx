import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

import Importer from '../importer/importer-container';
import Exporter from '../exporter/exporter-container';

function HeaderComponent(props) {
  return (
    <Menu>
      <Exporter
        getGlobalState={props.getGlobalState}
      />
      <Importer
        setGlobalState={props.setGlobalState}
      />
      <Menu.Item
        name="reset"
        icon="refresh"
        position="right"
        onClick={props.resetGlobalState}
      />
    </Menu>
  );
}

HeaderComponent.propTypes = {
  resetGlobalState: PropTypes.func.isRequired,
  getGlobalState: PropTypes.func.isRequired,
  setGlobalState: PropTypes.func.isRequired,
};

export default HeaderComponent;

