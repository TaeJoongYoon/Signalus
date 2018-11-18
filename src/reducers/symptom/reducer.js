import { 
  SYMPTOM_ADD_PENDING, SYMPTOM_ADD_SUCCESS, SYMPTOM_ADD_FAILURE,
  SYMPTOM_GET_PENDING, SYMPTOM_GET_SUCCESS, SYMPTOM_GET_FAILURE,
  SIGNAL_ADD_PENDING, SIGNAL_ADD_SUCCESS, SIGNAL_ADD_FAILURE,
  SIGNAL_GET_PENDING, SIGNAL_GET_SUCCESS, SIGNAL_GET_FAILURE,
 } from './actionTypes';

const initialState = {
  pending: false,
  error: false,
  isRegisterd: false,
  symptoms: [],
  signal: "",
}

export default symptom = (state=initialState, action) => {
  switch(action.type){
    
    case SIGNAL_ADD_PENDING:
    case SIGNAL_GET_PENDING:
    case SYMPTOM_ADD_PENDING:
    case SYMPTOM_GET_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case SIGNAL_ADD_SUCCESS:
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

    case SIGNAL_GET_SUCCESS:
      return{
        ...state,
        pending: false,
        isRegisterd: false,
        signal: action.payload.data,
      };

    case SIGNAL_ADD_FAILURE:
    case SIGNAL_GET_FAILURE:
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