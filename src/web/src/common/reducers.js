import { combineReducers } from 'redux';
import { conferenceReducer as conference } from './conference';
import { appReducer as app } from './app';
import { userReducer as user } from './user';
import { videoReducer as video } from './video';

const conferencesApp = combineReducers({
  conference,
  video,
  app,
  user,
});

export default conferencesApp;
