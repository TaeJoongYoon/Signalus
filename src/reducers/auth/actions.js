import { AsyncStorage } from 'react-native';
import { registerAPI, loginAPI, withdrawAPI } from './API';
import { 
  REGISTER_PENDING, REGISTER_SUCCESS, REGISTER_FAILURE,
  SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  WITHDRAWAL_PENDING, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE 
} from './actionTypes';

export const register = (id, password, age, gender, height, weight) => dispatch => {
  const pending = () => { return {type: REGISTER_PENDING}};
  const success = (response) => { return {type: REGISTER_SUCCESS, payload: response}};
  const failure = (error) => { return {type: REGISTER_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return registerAPI(id,password,age,gender,height,weight).then(
    (response) => {   // Success
    console.log(response); // Don't forget remove it
    dispatch(success(response));
    saveData(id, password, response);
  }).catch((error) => {   // Failure
    dispatch(failure(error))
  }) 
}

export const login = (id, password) => dispatch => {
  const pending = () => { return {type: SIGNIN_PENDING}};
  const success = (response) => { return {type: SIGNIN_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SIGNIN_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return loginAPI(id,password).then(
    (response) => {   // Success
    console.log(response); // Don't forget remove it
    dispatch(success(response));
    saveData(id, password, response);
  }).catch((error) => {// Failure
    console.log(error) // Don't forget remove it
    dispatch(failure(error))
  }) 
}

export const withdraw = (id, token) => dispatch => {
  const pending = () => { return {type: WITHDRAWAL_PENDING}};
  const success = (response) => { return {type: WITHDRAWAL_SUCCESS, payload: response}};
  const failure = (error) => { return {type: WITHDRAWAL_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return withdrawAPI(id, token).then(
    (response) => {   // Success
    console.log(response); // Don't forget remove it
    dispatch(success(response));
    clearData();
  }).catch((error) => {// Failure
    console.log(error) // Don't forget remove it
    dispatch(failure(error))
  }) 
}



const saveData = (id, password, response) => {
  AsyncStorage.multiSet([
    ["id", id],
    ["pw", password],
    ["token", response.data.token],
  ])
}

const clearData = () => {
  AsyncStorage.multiRemove(['id','pw','token']);
}