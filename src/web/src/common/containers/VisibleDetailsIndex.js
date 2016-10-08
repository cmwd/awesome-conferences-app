import { connect } from 'react-redux';
import { AsyncHook } from '../lib/server-async-hooks';
import Index from '../components/details/Index';
import { fetchConferenceIfNeeded } from '../actions/';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(fetchConferenceIfNeeded(params.slug));

const mapStateToProps = ({ conferences, detailsPage }, props) => {
  const { pathname, params: { slug } } = props;
  const conference = conferences.find(c => c.slug === slug) || {};
  return { ...conference, ...detailsPage, pathname };
};

const VisibleDetailsIndex = connect(mapStateToProps)(Index);

export default AsyncHook(fetchInitialData)(VisibleDetailsIndex);