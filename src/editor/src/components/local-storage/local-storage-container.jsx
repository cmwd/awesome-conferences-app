import { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

class LocalStorageContainer extends Component {
  static propTypes = {
    storeKey: PropTypes.string.isRequired,
    storeFn: PropTypes.func.isRequired,
    ready: PropTypes.func.isRequired,
    implementation: PropTypes.shape({
      setItem: PropTypes.func.isRequired,
      getItem: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.element.isRequired,
    debounceDelay: PropTypes.number.isRequired,
  };

  static defaultProps = {
    implementation: window.localStorage,
    storeKey: 'REACT_APP_PERSISTENT_STORE',
    debounceDelay: 250,
  };

  constructor(props) {
    super(props);
    const { implementation, storeKey } = props;

    this.state = JSON.parse(implementation.getItem(storeKey) || '{}');
    this.save = debounce(this.save.bind(this), props.debounceDelay);
  }

  componentDidMount() {
    const { storeFn, ready } = this.props;
    storeFn(this.save);
    ready(this.state);
  }

  save(state = {}) {
    const { implementation, storeKey } = this.props;
    implementation.setItem(storeKey, JSON.stringify(state));
  }

  render() {
    return this.props.children;
  }
}

export default LocalStorageContainer;

