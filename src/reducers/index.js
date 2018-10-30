import { combineReducers } from 'redux';
import auth from './auth/reducer';
import nav from './nav/reducer';
import bluetooth from './bluetooth/reducer';
import contact from './contact/reducer';
import symptom from './symptom/reducer';

const reducer = combineReducers({
  auth,
  nav,
  bluetooth,
  contact,
  symptom,
});

export default reducer;