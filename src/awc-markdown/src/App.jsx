import React, { Component } from 'react';

import { DescriptionPanel, EventsPanel, Header } from './components';
import markdownSerializer from './markdown-serializer';
import markdownParser from './markdown-parser';

class App extends Component {
  getState = () => {
    return {
      description: this.refs.description.state,
      events: this.refs.events.state.events,
    };
  };

  serialize = () => {
    const markdown = markdownSerializer(this.getState());

    console.log(markdown);
    console.log(markdownParser(markdown));
  }

  render() {
    return (
      <div>
        <Header getState={this.serialize} />
        <DescriptionPanel ref="description" />
        <EventsPanel ref="events" />
      </div>
    );
  }
}

export default App;

