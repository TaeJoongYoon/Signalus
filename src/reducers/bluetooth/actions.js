import { AsyncStorage } from 'react-native';
import { 
  CONNECT_PENDING, CONNECT_SUCCESS, CONNECT_FAILURE
} from './actionTypes';

export const connect = (device) => dispatch => {
  const pending = () => { return {type: CONNECT_PENDING}};
  const success = (device) => { return {type: CONNECT_SUCCESS, payload: device}};
  const failure = (error) => { return {type: CON, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return dispatch(success(device))
}