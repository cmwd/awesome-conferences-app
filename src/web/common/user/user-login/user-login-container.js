import { connect } from 'react-redux';
import UserLogin from './user-login-component';
import { userInfoSelector } from '../user-selectors';

export default connect(userInfoSelector)(UserLogin);
