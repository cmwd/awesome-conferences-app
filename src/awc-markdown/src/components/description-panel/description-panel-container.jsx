import React, { Component } from 'react';
import { pick, debounce } from 'lodash';

import DescriptionPanelComponent from './description-panel-component';

const PERSISTENT_STATE_KEY = 'description';
const PERSISTENT_STATE_DEBOUNCE_DELAY = 250;

class DescriptionPanelContainer extends Component {
  constructor(props) {
    super(props);
    const persistentState = JSON.parse(
      localStorage.getItem(PERSISTENT_STATE_KEY) || '{}');

    this.state = {
      ...DescriptionPanelComponent.defaultProps,
      ...persistentState,
      ...pick(props, Object.keys(DescriptionPanelComponent.defaultProps)),
    };
  }

  updateDescription = (event, { name, value }) => {
    this.setState(() => ({ [name]: value }));
    this.persistState();
  };

  persistState = debounce(() => {
    localStorage.setItem(PERSISTENT_STATE_KEY, JSON.stringify(this.state));
  }, PERSISTENT_STATE_DEBOUNCE_DELAY);

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

