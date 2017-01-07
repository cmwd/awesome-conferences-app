import React, { Component } from 'react';
import YAML from 'yamljs';
import { uniqueId, debounce } from 'lodash';
import { Container } from 'semantic-ui-react';

import { DescriptionPanel, EventsPanel } from './components';
import Header from './components/header/header-component';

const PERSIST_STORE_KEY = 'editor-store';

const createIdentifier = props => ({
  ...props,
  uuid: props.uuid || uniqueId('uuid-'),
});

class App extends Component {
  constructor(props) {
    super(props);

    const { conference = {}, events = {} } = JSON.parse(
      localStorage.getItem(PERSIST_STORE_KEY) || '{}');

    this.state = { conference, events };
  }

  getData = () => {
    return {
      conference: this.conference.state,
      events: this.events.getResult()
    };
  }

  storeInPersistentState = debounce(() => {
    const data = {
      conference: this.conference.state,
      events: this.events.state,
    };

    localStorage.setItem(PERSIST_STORE_KEY, JSON.stringify(data));
  }, 250);

  resetState = () => {
    this.conference.reset();
    this.events.reset();
  };

  parse = yamlString => {
    const { conference, events } = YAML.parse(yamlString);

    return {
      conference,
      events: events.map(event => ({
        ...createIdentifier(event),
        talks: event.talks.map(createIdentifier),
      }))
    };
  };

  render() {
    return (
      <div>
        <Container>
          <Header
            resetState={this.resetState}
            getData={this.getData}
          />
          <DescriptionPanel
            {...this.state.conference}
            ref={conference => this.conference = conference}
            storeInPersistentState={this.storeInPersistentState}
          />
          <EventsPanel
            {...this.state.events}
            ref={events => this.events = events}
            storeInPersistentState={this.storeInPersistentState}
          />
        </Container>
      </div>
    );
  }
}

export default App;

