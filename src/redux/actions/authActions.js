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
} from "./types";
import axios from 'axios';
import axiosInstance from "../../util/axiosInstance";
import { BACKEND_URL } from '../../util/constants';
import { getErrors, clearErrors } from "./errorActions";


// get user
export const setUser = data => dispatch => {
  dispatch({
    type: SET_USER,
    payload: data,
  });
};

export const clearJustCreated = () => dispatch => {
  axiosInstance
    .get(`${BACKEND_URL}/api/users/clear_just_created`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: CLEAR_JUST_CREATED,
        payload: res.data,
      });
    })
};

//Log user in
export const login = body => dispatch => {
  axios
    .post(`${BACKEND_URL}/api/auth/login`, body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "LOGIN_FAILED"
        )
      );
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

//Register User
export const register = body => dispatch => {
  axios
    .post(`${BACKEND_URL}/api/auth/register`, body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "REGISTER_FAILED"
        )
      );
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

// Register company
export const registerCompany = body => dispatch => {
  axios
    .post(`${BACKEND_URL}/api/company/create_company`, body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "REGISTER_COMPANY_FAILED"
        )
      );
      dispatch({
        type: REGISTER_COMPANY_FAILED,
      });
    });
};

//clear notifications
export const clearNotifications = (callBack) => dispatch => {
  axiosInstance
    .get("/api/users/clear_notifications")
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: CLEAR_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      callBack()
    });
}

export const saveItem = data => callBack => dispatch => {
  axiosInstance
    .post("/api/users/save", data)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: SAVE_ITEM,
        payload: res.data,
      });
      callBack()
    })
    .catch((err) => {
      alert('Unable to save')
    });
}

// Change settings
export const changeSettings = ({data, callback}) => dispatch => {
  const { userId, bio, email, firstName, lastName, password, newPassword, type, profilePic } = data
  const body = { bio, email, firstName, lastName, password, newPassword, profilePic }

  axiosInstance
    .post(`/api/users/${userId}?type=${type}`, body)
    .then((res) => {
      dispatch({
        type: CHANGE_SETTINGS,
        payload: res.data,
      });
      callback()
    })
    .catch((err) => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "CHANGE_SETTINGS_FAILED"
        )
      );
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const setIsAuthenticating = bool => dispatch => {
  dispatch({
    type: SET_IS_AUTHENTICATING,
    payload: bool,
  });
};
