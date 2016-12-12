import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { omit } from 'lodash';

class ConferenceDescription extends Component {
  static defaultProps = {
    name: '',
    description: '',
    url: '',
    email: '',
    twitterId: '',
    facebookId: '',
  };

  constructor(props) {
    const state = props.store.get('description');

    super(props);
    this.state = Object.assign({}, omit(props, ['store']), state);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.props.store.set('description', this.state);
    });
  }

  render() {
    return (
      <Form size="mini" onChange={this.handleChange}>
        <Form.Input
          required
          label="Conference name"
          type="text"
          name="name"
          value={this.state.name}
        />
        <Form.TextArea
          rows="3"
          name="description"
          label="Conference description"
          value={this.state.description}
        />
        <Grid>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="text"
              name="url"
              icon="home"
              placeholder="www"
              value={this.state.url}
            />
            <Form.Input
              type="text"
              name="email"
              icon="at"
              placeholder="e-mail"
              value={this.state.email}
            />
          </Grid.Column>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="text"
              name="twitterId"
              icon="twitter"
              placeholder="twitter id"
              value={this.state.twitterId}
            />
            <Form.Input
              type="text"
              name="facebookId"
              icon="facebook"
              placeholder="facebook account"
              value={this.state.facebookId}
            />
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default ConferenceDescription;
