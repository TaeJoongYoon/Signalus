import { combineReducers } from 'redux';
import auth from './auth/reducer';
import nav from './nav/reducer';
import bluetooth from './bluetooth/reducer';

const reducer = combineReducers({
  auth,
  nav,
  bluetooth,
});

export default reducer;