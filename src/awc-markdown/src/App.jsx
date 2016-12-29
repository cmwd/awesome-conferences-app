import React, { Component } from 'react';

import store from './store';
import { DescriptionPanel, EventsPanel, Header } from './components';

class App extends Component {
  constructor() {
    super();
    this.state = store.toObject();
    store.subscribe(() => this.setState(store.toObject()));
  }

  render() {
    return (
      <div>
        <Header />
        <DescriptionPanel
          {...this.state.description}
        />
        <EventsPanel
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;

