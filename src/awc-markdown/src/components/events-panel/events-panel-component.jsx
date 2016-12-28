import React, { Component, PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';

import EventDetails
  from '../event-details/event-details-component';
import PanelSidebar
  from '../events-panel-sidebar/events-panel-sidebar-component';

class EventsPanelComponent extends Component {
  static defaultProps = {
    events: [],
  };

  static propTypes = {
    events: PropTypes.array,
  };

  state = {
    activeIndex: 0,
  };

  render() {
    const { activeIndex } = this.state;
    const { events } = this.props;
    const eventTab = events[activeIndex];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width="4">
            <PanelSidebar
              activeIndex={activeIndex}
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
                />
                : null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default EventsPanelComponent;
