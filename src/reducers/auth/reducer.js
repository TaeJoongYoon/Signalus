import { 
  REGISTER_PENDING, REGISTER_SUCCESS, REGISTER_FAILURE,
  SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  WITHDRAWAL_PENDING, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE
 } from './actionTypes';
import { SIGNOUT, ON_CONSENT } from '../nav/actionTypes';

const initialState = {
  pending: false,
  error: false,
  isLoggedIn: false,
}

export default auth = (state=initialState, action) => {
  switch(action.type){
    
    case REGISTER_PENDING:
    case SIGNIN_PENDING:
    case WITHDRAWAL_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case SIGNIN_SUCCESS:
    case REGISTER_SUCCESS:
      const {msg, token} = action.payload.data;
      return {
        ...state,
        pending: false,
        isLoggedIn: true
      };

    case SIGNIN_FAILURE:
    case REGISTER_FAILURE:
    case WITHDRAWAL_FAILURE:
      return {
        ...state,
        pending: false,
        error: true
      };

    case WITHDRAWAL_SUCCESS:
    case SIGNOUT:
      return {
        ...state,
        isLoggedIn: false
      };

    case ON_CONSENT:
      state = initialState;
      return state;
      
    default:
      return state;
  }
}