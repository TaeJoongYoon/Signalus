import { 
  SYMPTOM_ADD_PENDING, SYMPTOM_ADD_SUCCESS, SYMPTOM_ADD_FAILURE,
  SYMPTOM_GET_PENDING, SYMPTOM_GET_SUCCESS, SYMPTOM_GET_FAILURE,
 } from './actionTypes';

const initialState = {
  pending: false,
  error: false,
  isRegisterd: false,
  symptoms: [],
}

export default symptom = (state=initialState, action) => {
  switch(action.type){
    
    case SYMPTOM_ADD_PENDING:
    case SYMPTOM_GET_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case SYMPTOM_ADD_SUCCESS:
      return {
        ...state,
        pending: false,
        isRegisterd: true
      };
    
    case SYMPTOM_GET_SUCCESS:
      const { symptom_list } = action.payload.data;
      return{
        ...state,
        pending: false,
        isRegisterd: false,
        symptoms: symptom_list,
      };

    case SYMPTOM_ADD_FAILURE:
    case SYMPTOM_GET_FAILURE:
      return {
        ...state,
        pending: false,
        error: true
      };

    default:
      return state;
  }
}