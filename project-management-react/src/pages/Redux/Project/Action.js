import api from "@/pages/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESSS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESSS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESSS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESSS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESSS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESSS,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESSS,
} from "./ActionTypes";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tag },
      });
      console.log("All projects", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESSS, projects: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    console.log("search projects", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESSS, projects: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.log("Create project----", data);
    dispatch({ type: CREATE_PROJECT_SUCCESSS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchProjecById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    console.log("project", data);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESSS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      console.log("delete project", data);
      dispatch({ type: DELETE_PROJECT_SUCCESSS, projectId });
    } catch (error) {
      console.log("error", error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      console.log("invite to project", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESSS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const acceptInvitation =
  ({ token, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: {
          token,
        },
      });

      navigate("/project/" + data.projectId);

      console.log("accept invitation", data);
      dispatch({ type: ACCEPT_INVITATION_SUCCESSS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };
