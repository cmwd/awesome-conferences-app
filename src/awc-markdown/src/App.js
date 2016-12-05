import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { Container, Header } from 'semantic-ui-react'
import { TalksComponent, reducer as talks } from './talks';

import logo from './logo.svg';

const store = createStore(combineReducers({ talks }));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          <Header as="h1" dividing>Conference</Header>
          <TalksComponent />
        </Container>
      </Provider>
    );
  }
}

export default App;
