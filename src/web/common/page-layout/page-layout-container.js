import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSelectors } from '../user';
import PageLayoutComponent from './page-layout-component';

const mapStateToProps = createSelector(
  userSelectors.userInfoSelector,
  (state, props) => props,
  (user, ownProps) => Object.assign({}, ownProps, { user }));

export default connect(mapStateToProps)(PageLayoutComponent);
