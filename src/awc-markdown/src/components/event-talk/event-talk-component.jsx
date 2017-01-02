import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

import Content from './content-component';
import './event-talk.css';

const toggleEditMode = ({ editMode }) => ({ editMode: !editMode });

class EventTalkComponent extends Component {
  static defaultProps = {
    talk_speaker_name: 'Speaker name',
    talk_title: 'Talk title',
    talk_speaker_twitter_id: '',
    talk_speaker_email: '',
    talk_video: '',
    talk_slides: '',
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    containerWrapper: PropTypes.func,
    itemWrapper: PropTypes.func,
    talk_title: PropTypes.string,
    talk_speaker_name: PropTypes.string,
    talk_speaker_twitter_id: PropTypes.string,
    talk_speaker_email: PropTypes.string,
    talk_video: PropTypes.string,
    talk_slides: PropTypes.string,
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
            name="talk_speaker_name"
            content={this.props.talk_speaker_name}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            name="talk_speaker_twitter_id"
            placeholder="Twitter ID"
            content={this.props.talk_speaker_twitter_id}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            name="talk_speaker_email"
            placeholder="E-mail"
            content={this.props.talk_speaker_email}
          />
        </Item>

        <Item className="event-talk__item">
          <Content
            {...contentProps}
            className="event-talk__field"
            name="talk_title"
            content={this.props.talk_title}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            placeholder="Video link"
            name="talk_video"
            content={this.props.talk_video}
          />
          <Content
            {...contentProps}
            className="event-talk__field"
            placeholder="Slides link"
            name="talk_slides"
            content={this.props.talk_slides}
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

