import { combineReducers } from 'redux';
import * as conferences from './conferences-reducer';
import * as details from './details-reducer';

const conferencesApp = combineReducers({ ...conferences, ...details });

export default conferencesApp;
