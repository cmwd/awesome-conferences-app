// @flow
import React, { Component } from 'react'
import BrowserHistory from 'react-history/BrowserHistory';
import { Push } from 'react-history';
import { StaticRouter } from 'react-router';

/**
 * https://gist.github.com/gaelduplessix/050e5cce31f9fabb1030f4ba47663db5
 */

/**
 * ControlledRouter, greatly inspired by https://gist.github.com/donnanicolas/3d76397a92551f449637590bf0413133
 * Usage:
 * <ControlledRouter location={location} setLocation={setLocation}>
 *  <App />
 * </ControlledRouter>
 */

type PropTypes = {
  location: Object,
  setLocation: Function,
  children?: React.Element<*>,
};

class ControlledRouter extends Component {
  constructor(props: PropTypes) {
    super(props);
    this.prevPathname = '';
  }

  prevPathname: string;
  props: PropTypes;

  render() {
    const { location, setLocation, children } = this.props;

    return (
      <BrowserHistory
        key={location.pathname}
      >
        {({ history, action, location: historyLocation }) => {
          const historyPathname = historyLocation.pathname;
          const controlledPathname = location.pathname;
          const pathChanged = historyPathname !== controlledPathname;
          const shouldUpdateState = pathChanged && historyPathname !== this.prevPathname;
          const shouldUpdateHistory = pathChanged && !shouldUpdateState;
          this.prevPathname = historyLocation.pathname;

          setTimeout(() => {
            setLocation(historyLocation);
          }, 0);

          return (
            <StaticRouter
              action={action}
              location={historyLocation}
              onPush={history.push}
              onReplace={history.replace}
              blockTransitions={history.block}
            >
              { shouldUpdateHistory ? <Push path={location.pathname} /> : children }
            </StaticRouter>
          );
        }}
      </BrowserHistory>
    );
  }
}

ControlledRouter.displayName = 'ControlledRouter';

export default ControlledRouter;
