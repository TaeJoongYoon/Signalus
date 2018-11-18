import { AsyncStorage } from 'react-native';
import { 
  CONNECT_PENDING, CONNECT_SUCCESS, CONNECT_FAILURE,
  DISCONNECT_PENDING, DISCONNECT_SUCCESS, DISCONNECT_FAILURE,
} from './actionTypes';

export const connect = (device) => dispatch => {
  const pending = () => { return {type: CONNECT_PENDING}};
  const success = (device) => { return {type: CONNECT_SUCCESS, payload: device}};
  const failure = (error) => { return {type: CONNECT_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  dispatch(success(device))  // return ConnectedDevice
  saveData(device)
}


const saveData = (device) => {
  AsyncStorage.multiSet([
    ["device", device],
  ])
}