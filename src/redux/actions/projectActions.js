import {
  CREATE_PROJECT,
  CREATING_PROJECT,
  CREATE_PROJECT_FAILED,
  GET_PROJECTS,
  GETTING_PROJECTS,
  GET_PROJECTS_FAILED,
  ADD_PROJECT_COMMENT,
  DELETE_PROJECT_COMMENT,
  DELETE_PROJECT,
  UPDATING_PROJECT,
  UPDATE_PROJECT,
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getProjects = () => (dispatch, getState) => {
  dispatch({ type: GETTING_PROJECTS });
  axios
    .get("/api/projects", tokenConfig())
    .then(res => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(err.response.data, err.response.status, "GETTING_PROJECTS_FAILED")
        );
      dispatch({ type: GET_PROJECTS_FAILED });
    });
};

export const createProject = body => (dispatch, getState) => {
  dispatch({ type: CREATING_PROJECT });
  axios
    .post("/api/projects", body, tokenConfig())
    .then(res =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CREATE_PROJECT_FAILED"
          )
        );
        dispatch({
          type: CREATE_PROJECT_FAILED
        });
      }
    });
};

export const updateProject = ({ projectId, action, stage, taskName }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_PROJECT
  });
  const body = { action, stage, taskName };

  axios
    .patch(`/api/projects/${projectId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "UPDATE_PROJECT_FAILED"
          )
        );
    });
};


export const addComment = ({ projectId, action, commenterId, text }) => (
  dispatch,
  getState
) => {
  const body = { action, commenterId, text };

  axios
    .patch(`/api/projects/${projectId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: ADD_PROJECT_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "ADD_PROJECT_COMMENT_FAILED"
          )
        );
    });
};

export const deleteComment = ({ projectId, commentId, action }) => (
  dispatch,
  getState
) => {
  const body = { action, commentId };

  axios
    .patch(`/api/projects/${projectId}`, body, tokenConfig())
    .then(res =>
      dispatch({
        type: DELETE_PROJECT_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_PROJECT_COMMENT_FAILED"
          )
        );
    });
};

export const deleteProject = projectId => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${projectId}`, tokenConfig())
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_PROJECT_FAILED"
          )
        );
    });
};
