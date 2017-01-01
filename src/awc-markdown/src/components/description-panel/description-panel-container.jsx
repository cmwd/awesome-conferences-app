import React, { Component } from 'react';
import { pick } from 'lodash';

import DescriptionPanelComponent from './description-panel-component';

class DescriptionPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DescriptionPanelComponent.defaultProps,
      ...pick(props, Object.keys(DescriptionPanelComponent.defaultProps)),
    };
  }

  updateDescription = (event, { name, value }) => {
    this.setState(
      () => ({ [name]: value })
    );
  };

  render() {
    return (
      <DescriptionPanelComponent
        {...this.state}
        updateDescription={this.updateDescription}
      />
    );
  }
}

export default DescriptionPanelContainer;

