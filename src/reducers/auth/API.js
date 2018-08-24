import axios from 'axios';
import { AUTH_URL } from '../../constants/URL';

export const registerAPI = (id, password, age, gender, height, weight) => {   // Register
  let data = JSON.stringify({
    id: id,
    password: password,
    age: age,
    gender: gender,
    height: height,
    weight: weight
  });

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    }
  };

  return axios.post(`${AUTH_URL}/signup`,data, headerConfig);
}

export const loginAPI = (id, password) => {   // Login
  let data = JSON.stringify({
    id: id,
    password: password
  });

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    }
  };

  return axios.post(`${AUTH_URL}/signin`,data, headerConfig);
}

export const withdrawAPI = (id, token) => {   // Withdraw
  let data = {
    'data': {
        id: id
    }
  }

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  let config = Object.assign({}, data, headerConfig);

  return axios.delete(`${AUTH_URL}/withdrawal`, config);
}