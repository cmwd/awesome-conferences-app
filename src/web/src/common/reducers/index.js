import { combineReducers } from 'redux';
import * as conferences from './conferences-reducer';

const conferencesApp = combineReducers({ ...conferences });

export default conferencesApp;
