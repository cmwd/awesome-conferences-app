import { connect } from 'react-redux';
import { AsyncHook } from '../lib/server-async-hooks';
import Index from '../components/details/Index';
import { fetchConferenceIfNeeded } from '../actions/';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(fetchConferenceIfNeeded(params.slug));

const mapStateToProps = ({ conferences, detailsPage }, { params }) => {
  const { slug } = params;
  const conference = conferences.find(c => c.slug === slug) || {};
  return { ...conference, ...detailsPage };
};

const VisibleDetailsIndex = connect(mapStateToProps)(Index);

export default AsyncHook(fetchInitialData)(VisibleDetailsIndex);
