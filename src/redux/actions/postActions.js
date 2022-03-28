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
  UPDATE_POST_LIKES,
  RESET_CREATED
} from "./types";
import axiosInstance from "../../util/axiosInstance";
import { getErrors } from "./errorActions";

export const getPosts = () => (dispatch) => {
  dispatch({ type: GETTING_POSTS });
  axiosInstance
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "GETTING_POSTS_FAILED"
        )
      );
      dispatch({
        type: GET_POSTS_FAILED
      });
    });
};

export const createPost = body => (dispatch) => {
  dispatch({ type: CREATING_POST });

  axiosInstance
    .post("/api/posts", body)
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "CREATE_POSTS_FAILED"
        )
      );
      dispatch({
        type: CREATE_POST_FAILED
      });
    });
};

export const resetCreated = () => (dispatch) => {
  dispatch({ type: RESET_CREATED });
};

export const updatePostLikes = ({ postId, action }) => (dispatch) => {
  dispatch({
    type: UPDATING_POST_LIKE
  });

  axiosInstance
    .patch(`/api/posts/${postId}`, { action })
    .then(res =>
      dispatch({
        type: UPDATE_POST_LIKES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "UPDATE_POST_LIKES_FAILED"
        )
      );
    });
};

export const addComment = (postId, action, commenterId, text) => (dispatch) => {
  const body = { action, commenterId, text };

  axiosInstance
    .patch(`/api/posts/${postId}`, body)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "ADD_COMMENT_FAILED"
        )
      );
    });
};

export const deleteComment = (postId, commentId, action) => (dispatch) => {
  const body = { action, commentId };

  axiosInstance
    .patch(`/api/posts/${postId}`, body)
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "DELETE_COMMENT_FAILED"
        )
      );
    });
};

export const deletePost = postId => (dispatch) => {
  axiosInstance
    .delete(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        getErrors(
          err?.response?.data || 'Something went wrong, try again',
          err?.response?.status || '000',
          "DELETE_POST_FAILED"
        )
      );
    });
};
