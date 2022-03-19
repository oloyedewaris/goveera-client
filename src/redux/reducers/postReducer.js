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
} from "../actions/types";

const initialState = {
  updatingPostLike: false,
  postLoading: false,
  postLoaded: false,
  postCreating: false,
  postCreated: false,
  posts: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_POSTS:
      return {
        ...state,
        postLoading: true,
        postCreated: false,
        postLoaded: false
      };
    case GET_POSTS:
      console.log('action.payload', action.payload)
      return {
        ...state,
        postLoading: false,
        postCreated: false,
        postLoaded: true,
        posts: action.payload.posts
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        postLoading: false,
        postLoaded: false
      };
    case CREATING_POST:
      return {
        ...state,
        postCreating: true,
        postCreated: false
      };
    case CREATE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        postCreated: true,
        postCreating: false
      };
    case CREATE_POST_FAILED:
      return {
        ...state,
        postCreated: false,
        postCreating: false
      };
    case RESET_CREATED:
      return {
        ...state,
        postCreated: false
      }
    case UPDATING_POST_LIKE:
      return {
        ...state,
        updatingPostLike: true
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        updatingPostLike: false,
        posts: action.payload.posts
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: action.payload.posts
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: action.payload.posts
      };
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload.posts
      };
    default:
      return state;
  }
}
