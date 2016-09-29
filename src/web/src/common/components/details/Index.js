import React, { PropTypes } from 'react';
import Details from './Details';
import LoadingPage from '../LoadingPage';

const Index = ({ details, name, loading, _id: conferenceId }) =>
  loading
    ? (<LoadingPage />)
    : (<Details {...{ ...details, name, conferenceId }} />);

Index.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  _id: PropTypes.string,
  details: PropTypes.object.isRequired,
};

export default Index;
