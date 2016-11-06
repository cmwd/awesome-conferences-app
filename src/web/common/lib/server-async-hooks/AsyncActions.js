import { Component, PropTypes } from 'react';

class AsyncActions extends Component {
  static propTypes = {
    children: PropTypes.element,
    context: PropTypes.shape({
      addAction: PropTypes.func.isRequired,
    }),
  };

  static childContextTypes = {
    serverAsyncContext: PropTypes.object,
  };

  constructor(...args) {
    const [{ context }] = args;
    super(...args);
    this.asyncContext = context;
  }

  getChildContext() {
    return { serverAsyncContext: this.asyncContext };
  }

  render() {
    return this.props.children;
  }
}

export default AsyncActions;
