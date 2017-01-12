import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import DescriptionPanel
  from './components/description-panel/description-panel-container';
import EventsPanel from './components/events-panel/events-panel-container';
import Header from './components/header/header-component';
import LocalStorage from './components/local-storage/local-storage-container';

const PERSISTENT_STORE_KEY = 'editor-store';

class App extends Component {
  state = {
    conference: {},
    events: [],
  };

  constructor(props) {
    super(props);

    this.setGlobalState = this.setGlobalState.bind(this);
    this.getGlobalState = this.getGlobalState.bind(this);
    this.resetGlobalState = this.resetGlobalState.bind(this);
    this.storeInPersistentData = this.storeInPersistentData.bind(this);
  }

  setGlobalState(state) {
    this.setState(state);
  }

  getGlobalState() {
    return {
      conference: this.conference.state,
      events: this.events.state.events,
    };
  }

  resetGlobalState() {
    this.conference.reset();
    this.events.reset();
  }

  storeInPersistentData() {
    this.storeFn(this.getGlobalState());
  }

  render() {
    return (
      <LocalStorage
        storeKey={PERSISTENT_STORE_KEY}
        ready={state => this.setState(state)}
        storeFn={(fn) => { this.storeFn = fn; }}
      >
        <Container>
          <Header
            resetGlobalState={this.resetGlobalState}
            getGlobalState={this.getGlobalState}
            setGlobalState={this.setGlobalState}
          />
          <DescriptionPanel
            {...this.state.conference}
            ref={(conference) => {
              this.conference = conference;
            }}
            saveInPersistentStore={this.storeInPersistentData}
          />
          <EventsPanel
            events={this.state.events}
            ref={(events) => {
              this.events = events;
            }}
            saveInPersistentStore={this.storeInPersistentData}
          />
        </Container>
      </LocalStorage>
    );
  }
}

export default App;

