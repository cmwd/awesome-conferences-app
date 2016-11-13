import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ConferencesList from './conferences-list-component';
import { getConferences } from '../conference/conference-actions';
import { AsyncHook } from '../lib/server-async-hooks';
import { conferenceSelectors } from '../conference';

const fetchConferencePage = ({ dispatch, page, itemsLimit }) =>
  dispatch(getConferences({ page, itemsLimit }));

const isRequred = (prop) => {
  throw new Error(`Missing required property: ${prop}`);
};

function mapStateToProps(state, props) {
  const {
    page = isRequred('page'),
    itemsLimit = isRequred('itemsLimit'),
    itemComponent = isRequred('itemComponent'),
  } = props;
  const ownProps = Object.assign({}, props,
    { page, itemsLimit, itemComponent });
  const result = items => ({ items, page, itemsLimit, itemComponent });

  return createSelector(
    conferenceSelectors.conferences, result)(
    state, ownProps);
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchConferencePage(page) {
      const { itemsLimit } = props;
      return fetchConferencePage({ dispatch, page, itemsLimit });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
  AsyncHook(
    fetchConferencePage)(
    ConferencesList));
