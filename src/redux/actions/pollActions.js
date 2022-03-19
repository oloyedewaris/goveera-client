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
  UPDATE_POLL,
  RESET_CREATED
} from "../actions/types";
import axiosInstance from "../../util/axiosInstance";
import { getErrors } from "./errorActions";

export const getPolls = () => (dispatch) => {
  dispatch({ type: GETTING_POLLS });
  axiosInstance
    .get("/api/polls")
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

export const createPoll = body => (dispatch) => {
  dispatch({ type: CREATING_POLL });

  axiosInstance
    .post("/api/polls", body)
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

export const resetCreated = () => (dispatch) => {
  dispatch({ type: RESET_CREATED });
};

export const updatePoll = ({ pollId, optionName, action }) => (dispatch) => {
  dispatch({ type: UPDATING_POLL });
  const body = { optionName, action };

  axiosInstance
    .patch(`/api/polls/${pollId}`, body)
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

export const addComment = (pollId, action, commenterId, text) => (dispatch) => {
  const body = { action, commenterId, text };

  axiosInstance
    .patch(`/api/polls/${pollId}`, body)
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

export const deleteComment = (pollId, commentId, action) => (dispatch) => {
  const body = { action, commentId };

  axiosInstance
    .patch(`/api/polls/${pollId}`, body)
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

export const deletePoll = pollId => (dispatch) => {
  axiosInstance
    .delete(`/api/polls/${pollId}`)
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
