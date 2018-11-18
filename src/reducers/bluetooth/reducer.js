import { 
  CONNECT_PENDING, CONNECT_SUCCESS, CONNECT_FAILURE,
  DISCONNECT_PENDING, DISCONNECT_SUCCESS, DISCONNECT_FAILURE,
} from './actionTypes';

const initialState = {
  pending: false,
  error: false,
  isConnected: false,
  device: {},
}

export default bluetooth = (state=initialState, action) => {
  switch(action.type){

    case CONNECT_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case CONNECT_SUCCESS:
      return {
        ...state,
        pending: false,
        isConnected: true,
        device: action.payload
      };

    case DISCONNECT_PENDING:
      return {
        ...state,
        pending: true,
        error: false,
      };

    case DISCONNECT_SUCCESS:
      return {
        ...state,
        pending: false,
        isConnected: false,
      };
      
    default:
      return state;
  }
}