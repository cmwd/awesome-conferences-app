import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';

let _instance;

export function Connect(WrappedComponent) {
  return (mapStateToProps = () => {}) => {
    const id = uniqueId('connector-');
    let handler;

    return class extends Component {
      constructor() {
        super();
        this.state = mapStateToProps(_instance.getState());
      }

      componentWillMount() {
        handler = state => console.log(state) || this.setState(mapStateToProps(state));
        _instance.subscribe(id, handler);
      }

      render() {
        return (<WrappedComponent { ...this.state } />);
      }
    }
  }
}

function createStore(reducers = {}) {
  let _state = {};
  const subscribers = [];

  function dispatcher(action) {
    const iterator = (result, reducerKey) =>
      Object.assign({}, result, {
        [reducerKey]:
          reducers[reducerKey](result[reducerKey], action),
      });

    _state = Object.keys(reducers).reduce(iterator, _state);
    subscribers.forEach(({ fn }) => fn(_state));
  }

  function subscribe(id, fn) {
    subscribers.push({ id, fn });
  }

  function getState() {
    return _state;
  }

  dispatcher('@@@INIT');

  return Object.freeze({ dispatcher, subscribe, getState });
}

export function dispatcher(...args) {
  return _instance.dispatcher(...args);
}

export default function (state = {}) {
  _instance = _instance || createStore(state);
  return _instance;
}
