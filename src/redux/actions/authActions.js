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
} from "./types";
import axios from "axios";
import { getErrors, clearErrors } from "./errorActions";

export const tokenConfig = () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

// get user's data
export const getUser = () => dispatch => {
  dispatch({ type: USER_LOADING });
  axios.get("/api/auth/authenticate", tokenConfig())
    .then((res) => {
      dispatch(clearErrors());
      console.log(res.data)
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status, "SET_USER_FAILED"));
        dispatch({ type: SET_USER_FAILED });
      }
    });
};

//Log user in
export const login = body => dispatch => {
  axios
    .post("/api/auth/login", body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          getErrors(err.response.data, err.response.status, "LOGIN_FAILED")
        );
        dispatch({
          type: LOGIN_FAILED,
        });
      }
    });
};

//Register User
export const register = body => dispatch => {

  axios
    .post("/api/auth/register", body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          getErrors(err.response.data, err.response.status, "REGISTER_FAILED")
        );
      }
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

// Register company
export const registerCompany = body => dispatch => {
  axios
    .post("/api/company/create_company", body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status, "REGISTER_COMPANY_FAILED"));
      }
      dispatch({ type: REGISTER_COMPANY_FAILED });
    });
};

//clear notifications
export const clearNotifications = () => (dispatch, getState) => {
  axios
    .get("/api/users/clear_notifications", tokenConfig())
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: CLEAR_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      alert('notification not succesfully cleared')
    });
}

export const saveItem = data => dispatch => {
  axios
    .post("/api/users/save", data, tokenConfig())
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: SAVE_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      alert('Saved to favourite')
    });
}

// Change settings
export const changeSettings = data => dispatch => {
  const { userId, bio, email, firstName, lastName, password, newPassword, type, profilePic } = data
  const body = { bio, email, firstName, lastName, password, newPassword, profilePic }

  axios
    .post(`/api/users/${userId}?type=${type}`, body, tokenConfig())
    .then((res) => {
      dispatch({
        type: CHANGE_SETTINGS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CHANGE_SETTINGS_FAILED"
          )
        );
      }
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
