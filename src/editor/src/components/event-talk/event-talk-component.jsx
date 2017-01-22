import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

import Content from './content-component';
import './event-talk.css';

const toggleEditMode = ({ editMode }) => ({ editMode: !editMode });

class EventTalkComponent extends Component {
  static defaultProps = {
    speaker_name: 'Speaker name',
    title: 'Talk title',
    speaker_twitter_id: '',
    speaker_email: '',
    video: '',
    slides: '',
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    containerWrapper: PropTypes.func,
    itemWrapper: PropTypes.func,
    title: PropTypes.string,
    speaker_name: PropTypes.string,
    speaker_twitter_id: PropTypes.string,
    speaker_email: PropTypes.string,
    video: PropTypes.string,
    slides: PropTypes.string,
  };

  state = {
    editMode: true,
  }

  render() {
    const {
      containerWrapper: Container,
      itemWrapper: Item,
    } = this.props;

    const contentProps = {
      inputMode: this.state.editMode,
      onChange: (event, { name, value }) =>
        this.props.updateTalk(this.props.uuid, { [name]: value }),
    };

    const actionButtonLabel = this.state.editMode ? 'Done' : 'Edit';
    const destroyButton = !this.state.editMode ? null : (
      <Button
        icon="remove"
        size="mini"
        content="Remove"
        floated="right"
        negative
        onClick={(evt) => {
          evt.preventDefault();
          this.props.removeTalk(this.props.uuid);
        }}
      />
    );

    return (
      <Container>
        <Item className="event-talk__item">
          <Content
            {...contentProps}
            className="event-talk__field"
            name="speaker_name"
            content={this.props.speaker_name}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            name="speaker_twitter_id"
            placeholder="Twitter ID"
            content={this.props.speaker_twitter_id}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            name="speaker_email"
            placeholder="E-mail"
            content={this.props.speaker_email}
          />
        </Item>

        <Item className="event-talk__item">
          <Content
            {...contentProps}
            className="event-talk__field"
            name="title"
            content={this.props.title}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            placeholder="Video link"
            name="video"
            content={this.props.video}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            placeholder="Slides link"
            name="slides"
            content={this.props.slides}
          />
        </Item>

        <Item className="event-talk__item">
          <div className="event-talk__field">
            {destroyButton}
          </div>
          <div className="event-talk__field">
            <Button
              icon="edit"
              size="mini"
              positive
              content={actionButtonLabel}
              floated="right"
              onClick={(evt) => {
                evt.preventDefault();
                this.setState(toggleEditMode);
              }}
            />
          </div>
        </Item>
      </Container>
    );
  }
}

export default EventTalkComponent;

