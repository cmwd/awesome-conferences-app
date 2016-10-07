import { connect } from 'react-redux';
import Navigation from '../components/header/Navigation';

const mapStateToProps = ({ user }) =>
  ({ user });

export default connect(mapStateToProps)(Navigation);
