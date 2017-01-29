import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const localStorage = {
  getItem: () => {},
  setItem: () => {},
};

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      localStorageImplementation={localStorage}
    />,
    div
  );
});
