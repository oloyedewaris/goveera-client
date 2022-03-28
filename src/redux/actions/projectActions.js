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
  RESET_CREATED
} from "./types";
import axiosInstance from "../../util/axiosInstance";
import { getErrors } from "./errorActions";

export const getProjects = () => (dispatch) => {
  dispatch({ type: GETTING_PROJECTS });
  axiosInstance
    .get("/api/projects")
    .then(res => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "GET_PROJECTS_FAILED"
        )
      );
      dispatch({ type: GET_PROJECTS_FAILED });
    });
};

export const createProject = body => (dispatch) => {
  dispatch({ type: CREATING_PROJECT });
  axiosInstance
    .post("/api/projects", body)
    .then(res =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "CREATE_PROJECT_FAILED"
        )
      );
      dispatch({
        type: CREATE_PROJECT_FAILED
      });
    });
};

export const resetCreated = () => (dispatch) => {
  dispatch({ type: RESET_CREATED });
};

export const updateProject = ({ projectId, action, stage, taskName }) => (dispatch) => {
  dispatch({
    type: UPDATING_PROJECT
  });
  const body = { action, stage, taskName };

  axiosInstance
    .patch(`/api/projects/${projectId}`, body)
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "UPDATE_PROJECT_FAILED"
        )
      );
    });
};

export const addComment = ({ projectId, action, commenterId, text }) => (dispatch) => {
  const body = { action, commenterId, text };

  axiosInstance
    .patch(`/api/projects/${projectId}`, body)
    .then(res =>
      dispatch({
        type: ADD_PROJECT_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "ADD_PROJECT_COMMENT_FAILED"
        )
      );
    });
};

export const deleteComment = ({ projectId, commentId, action }) => (
  dispatch,
) => {
  const body = { action, commentId };

  axiosInstance
    .patch(`/api/projects/${projectId}`, body)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "DELETE_PROJECT_COMMENT_FAILED"
        )
      );
    });
};

export const deleteProject = projectId => (dispatch) => {
  axiosInstance
    .delete(`/api/projects/${projectId}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "DELETE_PROJECT_FAILED"
        )
      );
    });
};
