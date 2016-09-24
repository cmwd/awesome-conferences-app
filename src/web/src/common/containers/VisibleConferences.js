import { connect } from 'react-redux';
import Conferences from '../components/conferences/Conferences';
import { selectConferencePage, fetchConferencesIfNeeded } from '../actions';
import { AsyncHook } from '../lib/server-async-hooks';

const fetchInitialData = ({ params, dispatch }) =>
  dispatch(fetchConferencesIfNeeded(params.current));

const mapStateToProps = (props) => {
  const { conferencePage, conferencesLoadingState } = props;
  const { conferences, pages } = conferencePage;
  return { conferences, pages, conferencesLoadingState };
};

const mapDispatchToProps = dispatch =>
  ({
    onSelect(page) {
      dispatch(selectConferencePage(page));
    },
  });

const VisibleConferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(Conferences);

export default AsyncHook(fetchInitialData)(VisibleConferences);
