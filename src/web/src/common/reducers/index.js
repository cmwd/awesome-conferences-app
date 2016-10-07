import { combineReducers } from 'redux';
import conferences from './conferences-reducer';
import conferencesPage from './conferences-page-reducer';
import detailsPage from './details-reducer';
import videos from './videos-reducer';
import application from './application-reducer';
import user from './user-reducer';

const conferencesApp = combineReducers({
  conferences,
  conferencesPage,
  detailsPage,
  videos,
  application,
  user,
});

export default conferencesApp;
