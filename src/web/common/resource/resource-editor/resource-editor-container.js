import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ResourceEditorComponent from './resource-editor-component';
import { topLevelNavigationTabsSelector } from '../resource-selectors';
import { setNavigationTabsData } from '../resource-actions';

const mapStateToProps = createSelector(
  topLevelNavigationTabsSelector,
  navigationTabs => ({ navigationTabs })
);

const mapDispatchToProps = dispatch => ({
  selectNavigationTabKey(activeKey) {
    dispatch(setNavigationTabsData({ activeKey }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
  ResourceEditorComponent);
