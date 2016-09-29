import { connect } from 'react-redux';
import Index from '../components/conferences/Index';
import { fetchConferencesIfNeeded } from '../actions';
import { AsyncHook } from '../lib/server-async-hooks';

const fetchInitialData = ({ params, dispatch }) =>
  dispatch(fetchConferencesIfNeeded(params.current));

const mapStateToProps = ({ conferences, conferencesPage }) =>
  ({ conferences, ...conferencesPage });

const mapDispatchToProps = dispatch =>
  ({
    onSelect(current) {
      dispatch(fetchConferencesIfNeeded(current));
    },
  });

const VisibleConferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default AsyncHook(fetchInitialData)(VisibleConferences);
