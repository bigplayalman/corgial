import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  isLoggedIn: false,
  token: null,
  userId: null,
};

const auth = (state = initialState, action) => {
  switch(action.type) {

    case SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isSigningUp: false,
        userId: action.res.data.objectId,
        token: action.res.data.sessionToken,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.res.data.objectId,
        token: action.res.data.sessionToken,
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false
      }

    default:
      return state;
  }
}

export default auth;
