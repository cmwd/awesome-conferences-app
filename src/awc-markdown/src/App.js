import React from 'react';

import { DescriptionPanel, EventsPanel } from './components';

const store = new Map();

function App() {
  return (
    <div>
      <DescriptionPanel store={store} />
      <EventsPanel store={store} />
    </div>
  );
}

export default App;
