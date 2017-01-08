import React, { Component } from 'react';
import YAML from 'yamljs';
import { uniqueId, debounce } from 'lodash';
import { Container } from 'semantic-ui-react';

import DescriptionPanel
  from './components/description-panel/description-panel-container';
import EventsPanel from './components/events-panel/events-panel-container';
import Header from './components/header/header-component';

const PERSIST_STORE_KEY = 'editor-store';

const createIdentifier = props => ({
  ...props,
  uuid: props.uuid || uniqueId('uuid-'),
});

class App extends Component {
  constructor(props) {
    super(props);

    const { conference = {}, events = [] } = JSON.parse(
      localStorage.getItem(PERSIST_STORE_KEY) || '{}');

    this.state = { conference, events };
  }

  getData = () => {
    return {
      conference: this.conference.state,
      events: this.events.getResult()
    };
  }

  setData = (state) => {
    this.setState(state, this.storeInPersistentState);
  };

  storeInPersistentState = debounce(() => {
    const data = {
      conference: this.conference.state,
      events: this.events.state.events,
    };

    localStorage.setItem(PERSIST_STORE_KEY, JSON.stringify(data));
  }, 250);

  resetState = () => {
    this.conference.reset();
    this.events.reset();
  };

  render() {
    return (
      <div>
        <Container>
          <Header
            resetState={this.resetState}
            getData={this.getData}
            setData={this.setData}
          />
          <DescriptionPanel
            {...this.state.conference}
            ref={conference => this.conference = conference}
            storeInPersistentState={this.storeInPersistentState}
          />
          <EventsPanel
            events={this.state.events}
            ref={events => this.events = events}
            storeInPersistentState={this.storeInPersistentState}
          />
        </Container>
      </div>
    );
  }
}

export default App;

