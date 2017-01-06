import React, { Component } from 'react';
import YAML from 'yamljs';
import { uniqueId } from 'lodash';

import { DescriptionPanel, EventsPanel, Header } from './components';

const YAML_INLINE_DEPTH = 5;
const YAML_INDENTION = 2;

const createIdentifier = props => ({
  ...props,
  uuid: props.uuid || uniqueId('uuid-'),
});

class App extends Component {
  getFormData() {
    return {
      conference: this.conference.state,
      events: this.events.getResult()
    };
  };

  serialize = () =>
    YAML.stringify(this.getFormData(), YAML_INLINE_DEPTH, YAML_INDENTION);

  parse = yamlString => {
    const { conference, events } = YAML.parse(yamlString);

    return {
      conference,
      events: events.map(event => ({
        ...createIdentifier(event),
        talks: event.talks.map(createIdentifier),
      }))
    };
  }

  render() {
    return (
      <div>
        <Header getState={this.serialize} />
        <DescriptionPanel ref={conference => this.conference = conference} />
        <EventsPanel ref={events => this.events = events} />
      </div>
    );
  }
}

export default App;

