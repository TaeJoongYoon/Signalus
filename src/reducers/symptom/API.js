import axios from 'axios';
import { SYMPTOM_URL } from '../../constants/URL';

export const addSymptomAPI = (id, symptoms, time, type, token) => {   // Register
  let data = JSON.stringify({
    id: id,
    symptoms: symptoms,
    time: time,
    type: type,
  });

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  return axios.put(`${SYMPTOM_URL}/add`,data, headerConfig);
}

export const getSymptomAPI = (id, token) => {   // Get Contacts

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  return axios.get(`${SYMPTOM_URL}/list/${id}`, headerConfig);
}