import React, { PropTypes } from 'react';
import Details from './Details';
import LoadingPage from '../LoadingPage';

const Index = ({ details, name, loading, _id: conferenceId, pathname }) =>
  loading
    ? (<LoadingPage />)
    : (<Details {...{ ...details, name, conferenceId, pathname }} />);

Index.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  _id: PropTypes.string,
  details: PropTypes.object.isRequired,
};

export default Index;
