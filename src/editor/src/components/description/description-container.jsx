import React, { Component } from 'react';
import { pick } from 'lodash';

import DescriptionComponent from './description-component';

class DescriptionPanelContainer extends Component {
  state = {};

  updateDescription = (event, { name, value }) => {
    this.setState(
      () => ({ [name]: value }));
  };

  render() {
    return (
      <DescriptionComponent
        {...this.state}
        updateDescription={this.updateDescription}
      />
    );
  }
}

export default DescriptionPanelContainer;

