import api from "@/pages/config/api";
import * as actionTypes from "./ActionTypes";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      console.log("fetch issues", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      console.log("fetch issues by id", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

// export const updateIssueStatus = ({ id, status }) => {
//   return async (dispatch) => {
//     dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
//     try {
//       const response = await api.put(`/api/issues/${id}/status/${status}`);
//       console.log("update issue status", response.data);
//       dispatch({
//         type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
//         issue: response.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
//         error: error.message,
//       });
//     }
//   };
// };

export const updateIssueStatus = ({ id, status, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        issue: response.data,
      });

      // Re-fetch updated issue list for this project
      dispatch(fetchIssues(projectId));
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

// export const assignedUserToIssue = ({ issueId, userId }) => {
//   return async (dispatch) => {
//     dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
//     try {
//       const response = await api.put(
//         `/api/issues/${issueId}/assignee/${userId}`
//       );
//       console.log("assigned issue", response.data);
//       dispatch({
//         type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
//         issue: response.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
//         error: error.message,
//       });
//     }
//   };
// };

export const assignedUserToIssue = ({ issueId, userId, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`
      );
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data,
      });

      // Refresh issue list
      dispatch(fetchIssues(projectId));
    } catch (error) {
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};

export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issues", issueData);
      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });
      console.log("Issue created successfully", response.data);
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
    try {
      await api.delete(`/api/issues/${issueId}`);
      dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// export const updateIssue = (updatedData) => {
//   return async (dispatch) => {
//     dispatch({ type: actionTypes.UPDATE_ISSUE_REQUEST });

//     try {
//       const response = await api.put(
//         `/api/issues/${updatedData.id}`,
//         updatedData
//       );
//       console.log("Issue updated successfully", response.data);

//       dispatch({
//         type: actionTypes.UPDATE_ISSUE_SUCCESS,
//         issue: response.data,
//       });

//       // Optional: if you're showing a list of issues, re-fetch them here
//       // dispatch(fetchIssues(updatedData.projectId)); // If you have projectId
//     } catch (error) {
//       dispatch({
//         type: actionTypes.UPDATE_ISSUE_FAILURE,
//         error: error.message,
//       });
//     }
//   };
// };

export const updateIssue = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_ISSUE_REQUEST });
  try {
    const res = await api.put(`/api/issues/${data.id}`, data);
    dispatch({ type: actionTypes.UPDATE_ISSUE_SUCCESS, issue: res.data });

    // Immediately refresh all issues of the project
    dispatch(fetchIssues(data.projectId));
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ISSUE_FAILURE,
      error: error.message || "Failed to update issue",
    });
  }
};
