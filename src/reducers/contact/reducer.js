import { 
  CONTACT_REGISTER_PENDING, CONTACT_REGISTER_SUCCESS, CONTACT_REGISTER_FAILURE,
  CONTACT_DELETE_PENDING, CONTACT_DELETE_SUCCESS, CONTACT_DELETE_FAILURE,
 } from './actionTypes';

const initialState = {
  pending: false,
  error: false,
  isRegisterd: false,
  isDeleted: false,
}

export default contact = (state=initialState, action) => {
  switch(action.type){
    
    case CONTACT_REGISTER_PENDING:
    case CONTACT_DELETE_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case CONTACT_REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        isDeleted: true
      };
    
    case CONTACT_DELETE_SUCCESS:
      return {
        ...state,
        pending: false,
        isRegisterd: true
      };  

    

    case CONTACT_REGISTER_FAILURE:
    case CONTACT_DELETE_FAILURE:
      return {
        ...state,
        pending: false,
        error: true
      };

    default:
      return state;
  }
}