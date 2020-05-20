import axios from 'axios';

const profile_api = 'http://localhost:8082/api';

export const registerRequest = (username, password, repeat_password) => {
  return axios.post(profile_api + '/register', {username, password, repeat_password});
}
export const loginRequest = (username, password) => {
  return axios.post(profile_api + '/login', {username, password});
}