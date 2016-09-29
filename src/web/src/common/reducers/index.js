import { combineReducers } from 'redux';
import conferences from './conferences-reducer';
import conferencesPage from './conferences-page-reducer';
import detailsPage from './details-reducer';
import videos from './videos-reducer';

const conferencesApp = combineReducers({
  conferences,
  conferencesPage,
  detailsPage,
  videos,
});

export default conferencesApp;
