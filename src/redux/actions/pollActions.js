import {
  GET_POLLS,
  GETTING_POLLS,
  GET_POLLS_FAILED,
  CREATE_POLL,
  CREATING_POLL,
  CREATE_POLL_FAILED,
  DELETE_POLL,
  UPDATING_POLL,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_POLL
} from "../actions/types";

import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getPolls = () => (dispatch, getState) => {
  dispatch({ type: GETTING_POLLS });
  axios
    .get("/api/polls", tokenConfig())
    .then(res =>
      dispatch({
        type: GET_POLLS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "GETTING_POLLS_FAILED"
          )
        );
        dispatch({
          type: GET_POLLS_FAILED
        });
      }
    });
};

export const createPoll = body => (dispatch, getState) => {
  dispatch({ type: CREATING_POLL });

  axios
    .post("/api/polls", body, tokenConfig())
    .then(res =>
      dispatch({
        type: CREATE_POLL,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CREATE_POLLS_FAILED"
          )
        );
        dispatch({
          type: CREATE_POLL_FAILED
        });
      }
    });
};

export const updatePoll = ({ pollId, optionName, action }) => (dispatch, getState) => {
  dispatch({ type: UPDATING_POLL });
  const body = { optionName, action };

  axios
    .patch(`/api/polls/${pollId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: UPDATE_POLL,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "UPDATE_POLL_FAILED"
          )
        );
    });
};


export const addComment = (pollId, action, commenterId, text) => (dispatch, getState) => {
  const body = { action, commenterId, text };

  axios
    .patch(`/api/polls/${pollId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "ADD_COMMENT_FAILED"
          )
        );
    });
};

export const deleteComment = (pollId, commentId, action) => (
  dispatch,
  getState
) => {
  const body = { action, commentId };

  axios
    .patch(`/api/polls/${pollId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_COMMENT_FAILED"
          )
        );
    });
};

export const deletePoll = pollId => (dispatch, getState) => {
  axios
    .delete(`/api/polls/${pollId}`, tokenConfig())
    .then(res =>
      dispatch({
        type: DELETE_POLL,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_POLL_FAILED"
          )
        );
    });
};
