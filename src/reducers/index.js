import { combineReducers } from 'redux';
import auth from './auth/reducer';
import nav from './nav/reducer';

const reducer = combineReducers({
  auth,
  nav,
});

export default reducer;