import React, { Component, PropTypes } from 'react';

const noopeFn = () => {};
const AsyncHook = (hookFn = noopeFn) =>
  WrappedComponent =>
    class extends Component {
      static contextTypes = {
        serverAsyncContext: PropTypes.object,
        store: PropTypes.object,
      };

      addAction(actionFn) {
        const {
          serverAsyncContext: { addAction = noopeFn } = {},
        } = this.context;
        const { dispatch } = this.context.store;

        return addAction(
          Promise.resolve(
            actionFn({ ...this.props, dispatch })));
      }

      componentWillMount() {
        this.addAction(hookFn);
      }

      render() {
        return (<WrappedComponent {...this.props} />);
      }
    };

export default AsyncHook;
