import { registerAPI, } from './API';
import { 
  CONTACT_REGISTER_PENDING, CONTACT_REGISTER_SUCCESS, CONTACT_REGISTER_FAILURE
} from './actionTypes';

export const register = (id, phoneNumber, token) => dispatch => {
  const pending = () => { return {type: CONTACT_REGISTER_PENDING}};
  const success = (response) => { return {type: CONTACT_REGISTER_SUCCESS, payload: response}};
  const failure = (error) => { return {type: CONTACT_REGISTER_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return registerAPI(id, phoneNumber, token).then(
    (response) => {   // Success
    console.log(response); // Don't forget remove it
    dispatch(success(response));
    saveData(id, password, response);
  }).catch((error) => {   // Failure
    console.log(error)
    dispatch(failure(error))
  }) 
}
