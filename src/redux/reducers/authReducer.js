import {
  SET_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  CHANGE_SETTINGS,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAILED,
  CLEAR_NOTIFICATIONS,
  SAVE_ITEM,
  CLEAR_JUST_CREATED,
  SET_IS_AUTHENTICATING
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case CLEAR_JUST_CREATED:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload?.token)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload?.token)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_COMPANY_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case REGISTER_COMPANY_FAILED:
      return {
        ...state,
        user: { company: null }
      }
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    case CHANGE_SETTINGS:
      return {
        ...state,
        user: action.payload,
      };
    case SAVE_ITEM:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        user: action.payload
      };
    case SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload
      };
    default:
      return state;
  }
}
