import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSelectors } from '../user';
import AdminComponent from './admin-component';

const mapStateToProps = createSelector(
  userSelectors.userInfoSelector,
  user => ({ user }));

export default connect(mapStateToProps)(AdminComponent);
