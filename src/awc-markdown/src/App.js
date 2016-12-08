import React, { Component } from 'react';
import { Provider } from 'react-redux';

// import { TalksComponent } from './talks';
import { PageHeader, ConferenceDetails, ConferenceEvents } from './components';
import { createReduxStore } from './state';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <Provider store={createReduxStore()}>
        <div>
            <PageHeader />
            <ConferenceDetails />
            <ConferenceEvents />
        </div>
      </Provider>
    );
  }
}

export default App;
