import { connect } from 'react-redux';
import { userSelectors } from '../../../user';
import UserNavigation from './user-navigation-component';

export default connect(userSelectors.userInfoSelector)(UserNavigation);
