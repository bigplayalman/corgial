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

const signup = (user) => instance.post('/users', user)
  .then(response => {
    window.localStorage.setItem('token', response.data.sessionToken);
    return response;
  })

const login = (username, password) => instance.get('/login', {
  params: {
    username,
    password
  }
});

const logout = () => {
  window.localStorage.removeItem('token');
}

const getCurrentUser = (session) => {
  instance.interceptors.request.use(function (config) {
    config.headers.common['X-Parse-Session-Token'] = session;
    return config;
  });
  
  return instance.get('/users/me').then(response => {
    return response;
  })
}

export default {
  signup,
  login,
  getCurrentUser
}
export {
  signup,
  login,
  getCurrentUser,
  logout
}
