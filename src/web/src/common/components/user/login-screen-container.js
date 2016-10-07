import { connect } from 'react-redux';
import LoginScreen from './login-screen-tag';

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(mapStateToProps)(LoginScreen);
