import React, { Component, PropTypes } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import store from 'store';

class DescriptionPanelComponent extends Component {
  static defaultProps = {
    name: '',
    description: '',
    url: '',
    email: '',
    twitterId: '',
    facebookId: '',
  };

  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    email: PropTypes.string,
    twitterId: PropTypes.string,
    facebookId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    store.set('description',
      Object.assign({}, this.props, { [name]: value }));
  }

  render() {
    return (
      <Form size="mini" onChange={this.handleChange}>
        <Form.Input
          required
          label="Conference name"
          type="text"
          name="name"
          value={this.props.name}
        />
        <Form.TextArea
          rows="3"
          name="description"
          label="Conference description"
          value={this.props.description}
        />
        <Grid>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="text"
              name="url"
              icon="home"
              placeholder="www"
              value={this.props.url}
            />
            <Form.Input
              type="text"
              name="email"
              icon="at"
              placeholder="e-mail"
              value={this.props.email}
            />
          </Grid.Column>
          <Grid.Column tablet="8" mobile="16">
            <Form.Input
              type="text"
              name="twitterId"
              icon="twitter"
              placeholder="twitter id"
              value={this.props.twitterId}
            />
            <Form.Input
              type="text"
              name="facebookId"
              icon="facebook"
              placeholder="facebook account"
              value={this.props.facebookId}
            />
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default DescriptionPanelComponent;

