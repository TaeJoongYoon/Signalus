import { addSymptomAPI, getSymptomAPI, addSignalAPI, getSignalAPI } from './API';
import { 
  SYMPTOM_ADD_PENDING, SYMPTOM_ADD_SUCCESS, SYMPTOM_ADD_FAILURE,
  SYMPTOM_GET_PENDING, SYMPTOM_GET_SUCCESS, SYMPTOM_GET_FAILURE,
  SIGNAL_ADD_PENDING, SIGNAL_ADD_SUCCESS, SIGNAL_ADD_FAILURE,
  SIGNAL_GET_PENDING, SIGNAL_GET_SUCCESS, SIGNAL_GET_FAILURE,
} from './actionTypes';

export const addSymptom = (id, symptoms, time, type, token) => dispatch => {
  const pending = () => { return {type: SYMPTOM_ADD_PENDING}};
  const success = (response) => { return {type: SYMPTOM_ADD_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SYMPTOM_ADD_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return addSymptomAPI(id, symptoms, time, type, token).then(
    (response) => {   // Success
    console.log(response)
    dispatch(success(response));
  }).catch((error) => {   // Failure
    console.log(error)
    dispatch(failure(error))
  }) 
}

export const getSymptoms = (id, token) => dispatch => {
  const pending = () => { return {type: SYMPTOM_GET_PENDING}};
  const success = (response) => { return {type: SYMPTOM_GET_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SYMPTOM_GET_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return getSymptomAPI(id, token).then(
    (response) => {   // Success
      console.log(response)
    dispatch(success(response));
  }).catch((error) => {   // Failure
    console.log(error)
    dispatch(failure(error))
  }) 
}

export const addSignal = (id, signalFile, time, token) => dispatch => {
  const pending = () => { return {type: SIGNAL_ADD_PENDING}};
  const success = (response) => { return {type: SIGNAL_ADD_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SIGNAL_ADD_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return addSignalAPI(id, signalFile, time, token).then(
    (response) => {   // Success
    console.log(response)
    dispatch(success(response));
  }).catch((error) => {   // Failure
    console.log(error)
    dispatch(failure(error))
  }) 
}

export const getSignal = (id, time, token) => dispatch => {
  const pending = () => { return {type: SIGNAL_GET_PENDING}};
  const success = (response) => { return {type: SIGNAL_GET_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SIGNAL_GET_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return getSignalAPI(id, time, token).then(
    (response) => {   // Success
    console.log(response)
    dispatch(success(response));
  }).catch((error) => {   // Failure
    console.log(error)
    dispatch(failure(error))
  }) 
}