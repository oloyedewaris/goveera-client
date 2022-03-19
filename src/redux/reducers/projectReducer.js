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
} from "../actions/types";

const initialState = {
  updatingProjectLike: false,
  projectLoading: false,
  projectLoaded: false,
  projectCreating: false,
  projectCreated: false,
  projects: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_PROJECTS:
      return {
        ...state,
        projectLoading: true,
        projectCreated: false,
        projectLoaded: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projectLoading: false,
        projectLoaded: true,
        projectCreated: false,
        projects: action.payload.projects
      };
    case GET_PROJECTS_FAILED:
      return {
        ...state,
        projectLoading: false,
        projectCreated: false,
        projectLoaded: false
      };
    case CREATING_PROJECT:
      return {
        ...state,
        projectCreating: true,
        projectCreated: false
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: action.payload.projects,
        projectCreated: true,
        projectCreating: false
      };
    case CREATE_PROJECT_FAILED:
      return {
        ...state,
        projectCreated: false,
        projectCreating: false
      };
    case RESET_CREATED:
      return {
        ...state,
        projectCreated: false
      }
    case UPDATING_PROJECT:
      return {
        ...state,
        updatingProjectLike: true
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        updatingProjectLike: false,
        projects: action.payload.projects
      };
    case ADD_PROJECT_COMMENT:
      return {
        ...state,
        projects: action.payload.projects
      };
    case DELETE_PROJECT_COMMENT:
      return {
        ...state,
        projects: action.payload.projects
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: action.payload.projects
      };
    default:
      return state;
  }
}
