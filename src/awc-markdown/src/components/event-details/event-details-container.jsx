import React, { Component } from 'react';
import { pick } from 'lodash';

import EventDetailsComponent from './event-details-component';

class EventDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...EventDetailsComponent.defaultProps,
      ...pick(props, Object.keys(EventDetailsComponent.defaultProps)),
      uuid: props.uuid,
    };
  }

  componentDidMount() {
    this.props.updateEvent(this.state);
  }

  updateEvent = (props) => {
    this.props.updateEvent({
      ...this.state,
      ...props,
    }); 
  };

  render() {
    return (
      <EventDetailsComponent
        {...this.props}
        updateEvent={this.updateEvent}
      />
    );
  }
}

export default EventDetailsContainer;

