import React from 'react';
import Header from './Header';
import { VisibleConferencesList } from '../containers';

const App = () => (
  <div className="container">
    <Header />
    <VisibleConferencesList />
  </div>
);

export default App;
