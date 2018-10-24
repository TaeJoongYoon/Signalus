import axios from 'axios';
import { CONTACT_URL } from '../../constants/URL';

export const registerAPI = (id, phoneNumber, token) => {   // Register
  let data = JSON.stringify({
    id: id,
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
