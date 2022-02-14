import {
  USER_LOADING,
  SET_USER,
  SET_USER_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  CHANGE_SETTINGS,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAILED,
  CLEAR_NOTIFICATIONS,
  SAVE_ITEM
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  userLoading: false,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        userLoading: true
      }
    case SET_USER:
      return {
        ...state,
        userLoading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action?.payload?.token)
      return {
        ...state,
        userLoading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("registered", true)
      localStorage.setItem('token', action?.payload?.token)
      return {
        ...state,
        userLoading: false,
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
    case SET_USER_FAILED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        userLoading: false,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        userLoading: false,
        isAuthenticated: false
      };
    case CHANGE_SETTINGS:
      alert("Settings updated succesfully");
      return {
        ...state,
        user: action.payload,
      };
    case SAVE_ITEM:
      alert("Done")
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
