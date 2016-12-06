import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container, Header } from 'semantic-ui-react'

// import { TalksComponent } from './talks';
import { SectionHeaderComponent, SectionEventsComponent } from './components';
import { createReduxStore } from './state';
import logo from './logo.svg';

          // <TalksComponent />
const store = createReduxStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
            <SectionHeaderComponent />
            <SectionEventsComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
