import axios from 'axios';
import { CONTACT_URL } from '../../constants/URL';

export const registerAPI = (id, name, phoneNumber, token) => {   // Register
  let data = JSON.stringify({
    id: id,
    name: name,
    phoneNumber: phoneNumber,
  });

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  return axios.put(`${CONTACT_URL}/add`,data, headerConfig);
}

export const deleteAPI = (id, phoneNumber, token) => {   // Delete
  let data = {
    'data': {
        id: id,
        phoneNumber: phoneNumber,
    }
  }

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  let config = Object.assign({}, data, headerConfig);

  return axios.delete(`${CONTACT_URL}/delete`, config);
}

export const getContactsAPI = (id, token) => {   // Get Contacts

  let headerConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': token,
    }
  };

  return axios.get(`${CONTACT_URL}/list/${id}`, headerConfig);
}