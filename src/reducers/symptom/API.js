import axios from 'axios';
import { SYMPTOM_URL, SIGNAL_URL } from '../../constants/URL';

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

export const addSignalAPI = (id, signalFile, time, token) => {   // Register
  let data = new FormData();
  data.append("id", id);
  data.append("signalFile", { uri: signalFile, name: `${time}.txt`, type: 'text/plain' });
  data.append("time", time);

  let headerConfig = {
    headers: {
    'Content-Type': 'multipart/form-data',
    'x-access-token': token,
    }
  };

  return axios.post(`${SIGNAL_URL}`,data, headerConfig);
}

export const getSignalAPI = (id, time, token) => {   // Get Contacts

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  return axios.get(`${SIGNAL_URL}/${id}/${time}`, headerConfig);
}