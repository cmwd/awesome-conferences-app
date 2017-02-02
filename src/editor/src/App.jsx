import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Description from './components/description/description-container';
import Events from './components/events/events-container';
import Header from './components/header/header-component';

class App extends Component {
  constructor(props) {
    super(props);

    this.resetGlobalState = this.resetGlobalState.bind(this);
    this.storeInPersistentData = this.storeInPersistentData.bind(this);
  }

  state = {
    conference: {},
    events: [],
  };

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
      <BrowserRouter>
        <Container text>
          <Header
            resetGlobalState={this.resetGlobalState}
            getGlobalState={this.getGlobalState}
            setGlobalState={this.setGlobalState}
          />
          <Description />
          <Events />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

