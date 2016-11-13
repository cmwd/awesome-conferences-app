/* @flow */

import React, { Component } from 'react';
import './conferences-list.scss';

type propTypes = {
  itemComponent: ReactClass,
  page: Number,
  items: Array,
  fetchConferencePage: Promise,
};

export default class ConferenceList extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.props.fetchConferencePage(nextProps.page);
    }
  }

  props: propTypes;

  render() {
    const { itemComponent: ItemComponent, items, ...rest } = this.props;

    return (
      <div className="conferences">
        {items.map(conference => (
          <ItemComponent
            {...rest}
            conference={conference}
            key={conference._id}
          />
        ))}
      </div>
    );
  }
}
