import axios from 'axios';
import config from './config';

// TODO: construct this based on environment
const BASE_URL = 'http://localhost:1337/parse';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Parse-Application-Id': config.parseAppId
  }
});

export const signup = (username, password) => instance.post('/users', {
  username,
  password
});

export const login = (username, password) => instance.get('/login', {
  params: {
    username,
    password
  }
});

export default {
  signup,
  login
}
