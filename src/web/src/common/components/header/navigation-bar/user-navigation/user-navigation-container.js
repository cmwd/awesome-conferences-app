import { connect } from 'react-redux';
import UserNavigation from './user-navigation-tag';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(UserNavigation);
