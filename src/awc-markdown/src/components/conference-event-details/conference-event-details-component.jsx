import React, { Component } from 'react';
import { Input, Grid, Divider, Item, Table } from 'semantic-ui-react';

import { Talk, TalkEditor } from 'components';
// import { Geolocation } from 'components';

export default class ConferenceEventDetails extends Component {
  static defaultProps = {
    newTalkMode: true,
  }

  constructor(props) {
    super(props);
    this.state = props;
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTalkAction = this.handleTalkAction.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps);
  }

  handleFieldChange(event, { name, value }) {
    const { updateEventDescription, uuid } = this.props;

    updateEventDescription(uuid, { [name]: value });
  }

  handleTalkAction(actionFn) {
    const { uuid } = this.props;

    return talkDetails => actionFn(uuid, talkDetails);
  }

  render() {
    const commonDescriptionProps = {
      fluid: true,
      onChange: this.handleFieldChange,
    };

    const { createEventTalk, destroyEventTalk, updateEventTalk } = this.props;

    return (
      <article>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              <Input
                {...commonDescriptionProps}
                type="text"
                name="name"
                value={this.state.description.name}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="7">
              <Input
                value={this.state.description.startDate}
                label="start"
                type="date"
                name="startDate"
                {...commonDescriptionProps}
              />
            </Grid.Column>
            <Grid.Column width="7" floated="right">
              <Input
                {...commonDescriptionProps}
                label="end"
                type="date"
                name="endDate"
                value={this.state.description.endDate}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="16">
              <Item.Group>
                <Table>
                  <Table.Body>

                    {this.state.talks.map(talk =>
                      (<Talk
                        key={talk.uuid}
                        {...talk}
                        updateTalk={this.handleTalkAction(updateEventTalk)}
                        destroyTalk={this.handleTalkAction(destroyEventTalk)}
                      />))}

                  </Table.Body>
                </Table>
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TalkEditor
                componentMode={TalkEditor.COMPONENT_MODE.CREATE}
                createTalk={this.handleTalkAction(createEventTalk)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {!this.state.last
          ? (<Divider />)
          : null}
      </article>
    );
  }
}

