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

const initialState = {
  updatingPoll: false,
  pollLoading: false,
  pollLoaded: false,
  pollCreating: false,
  pollCreated: false,
  polls: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_POLLS:
      return {
        ...state,
        pollLoading: true,
        pollCreated: false,
        pollLoaded: false
      };
    case GET_POLLS:
      return {
        ...state,
        pollLoading: false,
        pollCreated: false,
        pollLoaded: true,
        polls: action.payload
      };
    case GET_POLLS_FAILED:
      return {
        ...state,
        pollLoading: false,
        pollLoaded: false
      };
    case CREATING_POLL:
      return {
        ...state,
        pollCreating: true,
        pollCreated: false
      };
    case CREATE_POLL:
      return {
        ...state,
        polls: action.payload,
        pollCreated: true,
        pollCreating: false
      };
    case CREATE_POLL_FAILED:
      return {
        ...state,
        pollCreated: false,
        pollCreating: false
      };
    case UPDATING_POLL:
      return {
        ...state,
        updatingPoll: true
      };
    case UPDATE_POLL:
      return {
        ...state,
        updatingPoll: false,
        polls: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        polls: action.payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        polls: action.payload
      };
    case DELETE_POLL:
      return {
        ...state,
        polls: action.payload
      };
    default:
      return state;
  }
}
