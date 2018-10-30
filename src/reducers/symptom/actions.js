import { addSymptomAPI, getSymptomAPI } from './API';
import { 
  SYMPTOM_ADD_PENDING, SYMPTOM_ADD_SUCCESS, SYMPTOM_ADD_FAILURE,
  SYMPTOM_GET_PENDING, SYMPTOM_GET_SUCCESS, SYMPTOM_GET_FAILURE,
} from './actionTypes';

export const add = (id, symptoms, time, type, token) => dispatch => {
  const pending = () => { return {type: SYMPTOM_ADD_PENDING}};
  const success = (response) => { return {type: SYMPTOM_ADD_SUCCESS, payload: response}};
  const failure = (error) => { return {type: SYMPTOM_ADD_FAILURE, payload: error}};

  dispatch(pending());  // Dispatch Action Starting

  return addSymptomAPI(id, symptoms, time, type, token).then(
    (response) => {   // Success
    dispatch(success(response));
  }).catch((error) => {   // Failure
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
    dispatch(success(response));
  }).catch((error) => {   // Failure
    dispatch(failure(error))
  }) 
}
