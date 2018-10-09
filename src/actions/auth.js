import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETCURRENTUSER_REQUEST,
  GETCURRENTUSER_SUCCESS,
  GETCURRENTUSER_FAILURE
} from '../constants/actionTypes';
import api from '../api';

export function signup(username, password) {
  return {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    promise: api.signup(username, password)
  };
}

export function login(username, password) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: api.login(username, password)
  }
}

export function getCurrentUser(session) {
  return {
    types: [GETCURRENTUSER_REQUEST, GETCURRENTUSER_SUCCESS, GETCURRENTUSER_FAILURE],
    promise: api.getCurrentUser(session)
  };
}