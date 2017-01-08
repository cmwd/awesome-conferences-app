import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

import Importer from '../importer/importer-container';
import Exporter from '../exporter/exporter-container';

function HeaderComponent(props) {
  return (
    <Menu>
      <Exporter
        getData={props.getData}
      />
      <Importer
        setData={props.setData}
      />
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
  getData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default HeaderComponent;

