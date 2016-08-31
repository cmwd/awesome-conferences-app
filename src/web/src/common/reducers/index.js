import { combineReducers } from 'redux';
import conferences from './conferences';
import pages from './pages';

const conferencesApp = combineReducers({ conferences, pages });

export default conferencesApp;
