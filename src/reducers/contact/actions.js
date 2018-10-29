import { registerAPI, deleteAPI, getContactsAPI, } from './API';
import { 
  CONTACT_REGISTER_PENDING, CONTACT_REGISTER_SUCCESS, CONTACT_REGISTER_FAILURE,
  CONTACT_DELETE_PENDING, CONTACT_DELETE_SUCCESS, CONTACT_DELETE_FAILURE,
  CONTACT_GET_PENDING, CONTACT_GET_SUCCESS, CONTACT_GET_FAILURE,
} from './actionTypes';

export const register = (id, name, phoneNumber, token) => dispatch => {
  const pending = () => { return {type: CONTACT_REGISTER_PENDING}};
  const success = (response) => { return {type: CONTACT_REGISTER_SUCCESS, payload: response}};
  const failure = (error) => { return {type: CONTACT_REGISTER_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return registerAPI(id, name, phoneNumber, token).then(
    (response) => {   // Success
    dispatch(success(response));
  }).catch((error) => {   // Failure
    dispatch(failure(error))
  }) 
}

export const deleteContact = (id, phoneNumber, token) => dispatch => {
  const pending = () => { return {type: CONTACT_DELETE_PENDING}};
  const success = (response) => { return {type: CONTACT_DELETE_SUCCESS, payload: response}};
  const failure = (error) => { return {type: CONTACT_DELETE_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return deleteAPI(id, phoneNumber, token).then(
    (response) => {   // Success
    dispatch(success(response));
  }).catch((error) => {   // Failure
    dispatch(failure(error))
  }) 
}

export const getContacts = (id, token) => dispatch => {
  const pending = () => { return {type: CONTACT_GET_PENDING}};
  const success = (response) => { return {type: CONTACT_GET_SUCCESS, payload: response}};
  const failure = (error) => { return {type: CONTACT_GET_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return getContactsAPI(id, token).then(
    (response) => {   // Success
    dispatch(success(response));
  }).catch((error) => {   // Failure
    dispatch(failure(error))
  }) 
}
