import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import EventTalksComponent from './event-talks-component';

class EventTalksContainer extends Component {
  createTalk = (props = {}) => {
    const talk = {
      ...props,
      uuid: props.uuid || uniqueId(`uuid-${Date.now()}-`)
    };

    this.props.updateEvent({
      talks: [talk, ...this.props.talks],
    });
  }

  updateTalk = (uuid, props) => {
    const talks = this.props.talks.map(talk =>
      talk.uuid === uuid ? { ...talk, ...props } : talk);

    this.props.updateEvent({ talks });
  }

  removeTalk = (uuid) => {
    const talks = this.props.talks.filter(talk => talk.uuid !== uuid);

    this.props.updateEvent({ talks });
  };

  render() {
    return (
      <EventTalksComponent
        {...this.props}
        createTalk={this.createTalk}
        updateTalk={this.updateTalk}
        removeTalk={this.removeTalk}
      />
    );
  }
}

export default EventTalksContainer;

