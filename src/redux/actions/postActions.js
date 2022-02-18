import {
  GET_POSTS,
  GETTING_POSTS,
  GET_POSTS_FAILED,
  CREATE_POST,
  CREATING_POST,
  CREATE_POST_FAILED,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  UPDATING_POST_LIKE,
  UPDATE_POST_LIKES
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getPosts = () => (dispatch, getState) => {
  dispatch({ type: GETTING_POSTS });
  axios
    .get("https://goveera-server.herokuapp.com/api/posts", tokenConfig())
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "GETTING_POSTS_FAILED"
          )
        );
      dispatch({
        type: GET_POSTS_FAILED
      });
    });
};

export const createPost = body => (dispatch, getState) => {
  dispatch({ type: CREATING_POST });

  axios
    .post("https://goveera-server.herokuapp.com/api/posts", body, tokenConfig())
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CREATE_POSTS_FAILED"
          )
        );
        dispatch({
          type: CREATE_POST_FAILED
        });
      }
    });
};

export const updatePostLikes = ({ postId, action }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_POST_LIKE
  });

  axios
    .patch(`https://goveera-server.herokuapp.com/api/posts/${postId}`, { action }, tokenConfig())
    .then(res =>
      dispatch({
        type: UPDATE_POST_LIKES,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "UPDATE_POST_LIKES_FAILED"
          )
        );
    });
};

export const addComment = (postId, action, commenterId, text) => (dispatch, getState) => {
  const body = { action, commenterId, text };

  axios
    .patch(`https://goveera-server.herokuapp.com/api/posts/${postId}`, body, tokenConfig())
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

export const deleteComment = (postId, commentId, action) => (
  dispatch,
  getState
) => {
  const body = { action, commentId };

  axios
    .patch(`https://goveera-server.herokuapp.com/api/posts/${postId}`, body, tokenConfig())
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

export const deletePost = postId => (dispatch, getState) => {
  axios
    .delete(`https://goveera-server.herokuapp.com/api/posts/${postId}`, tokenConfig())
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_POST_FAILED"
          )
        );
    });
};
