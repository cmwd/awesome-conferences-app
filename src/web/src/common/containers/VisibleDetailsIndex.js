import { connect } from 'react-redux';
import { AsyncHook } from '../lib/server-async-hooks';
import DetailsIndex from '../components/details/DetailsIndex';
import { fetchDetailsPageIfNeeded } from '../actions/';

const fetchInitialData = ({ dispatch, params }) =>
  dispatch(fetchDetailsPageIfNeeded(params.conferenceId));

const mapStateToProps = ({ detailsPage }, { params }) => {
  const { conferenceId } = params;
  const { loading, pages } = detailsPage;

  return { loading, ...pages[conferenceId] };
};

const VisibleDetailsIndex = connect(mapStateToProps)(DetailsIndex);

export default AsyncHook(fetchInitialData)(VisibleDetailsIndex);
