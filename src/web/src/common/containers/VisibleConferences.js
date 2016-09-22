import { connect } from 'react-redux';
import Conferences from '../components/conferences/Conferences';
import { selectConferencePage, fetchConferencesIfNeeded } from '../actions';

const mapStateToProps = (props) => {
  const { conferencePage, conferencesLoadingState } = props;
  const { conferences, pages } = conferencePage;
  return { conferences, pages, conferencesLoadingState };
};

const mapDispatchToProps = (dispatch, { params }) => {
  dispatch(fetchConferencesIfNeeded(params.current));
  return {
    onSelect(page) {
      dispatch(selectConferencePage(page));
    },
  };
};

const VisibleConferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(Conferences);

export default VisibleConferences;
