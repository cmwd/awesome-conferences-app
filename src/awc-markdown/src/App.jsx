import React, { Component } from 'react';

import { DescriptionPanel, EventsPanel, Header } from './components';

class App extends Component {
  getState = () => {
    return {
      description: this.refs.description.state,
      events: this.refs.events.state,
    };
  };

  render() {
    return (
      <div>
        <Header getState={this.getState} />
        <DescriptionPanel ref="description" />
        <EventsPanel ref="events" />
      </div>
    );
  }
}

export default App;

