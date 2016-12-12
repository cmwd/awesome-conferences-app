import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import { Grid } from 'semantic-ui-react';

import EventDetails
  from '../events-panel-details/events-panel-details-component';
import PanelSidebar
  from '../events-panel-sidebar/events-panel-sidebar-component';

class ConferenceEvents extends Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
    this.handleDetailsChanged = this.handleDetailsChanged.bind(this);
  }

  state = {
    events: [],
    activeIndex: 0,
  };

  addEvent() {
    const event = {
      uuid: uniqueId('uuid-'),
      name: 'Event name',
    };

    this.setState({
      events: [
        event,
        ...this.state.events,
      ],
    });
  }

  handleDetailsChanged(newEventObject) {
    const events = this.state.events.map(event =>
      event.uuid === newEventObject.uuid
        ? newEventObject
        : event);

    this.setState({ events });
    this.props.store.set('events', events);
  }

  render() {
    const {
      events,
      activeIndex,
    } = this.state;
    const eventTab = events[activeIndex];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width="4">
            <PanelSidebar
              activeIndex={activeIndex}
              addEvent={this.addEvent}
              setCurrent={index => this.setState({ activeIndex: index })}
              items={events}
            />
          </Grid.Column>
          <Grid.Column width="12">
            {
              events[activeIndex]
                ? <EventDetails
                  key={eventTab.uuid}
                  {...eventTab}
                  onChange={this.handleDetailsChanged}
                />
                : null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ConferenceEvents;
