import { API_BASE_URL } from "@/pages/config/api";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";
import axios from "axios";

export const register =
  (userData, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        userData
      );

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        setSuccessMessage("Registration successful");
      }

      console.log("Register success", data);
    } catch (error) {
      console.error("Register error", error);

      if (error.response?.data?.message || error.response?.data?.error) {
        setErrorMessage(
          error.response.data.message || error.response.data.error
        );
      } else if (error.response?.status === 500) {
        setErrorMessage("Internal Server Error. Please try again.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

export const login =
  (userData, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signing`,
        userData
      );

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        setSuccessMessage("Login successful");
      }

      console.log("Login success", data);
    } catch (error) {
      console.error("Login error", error);

      if (error.response?.data?.message || error.response?.data?.error) {
        setErrorMessage(
          error.response.data.message || error.response.data.error
        );
      } else if (error.response?.status === 403) {
        setErrorMessage("Invalid credentials or user does not exist.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    // if (data.jwt) {
    //   localStorage.setItem("jwt", data.jwt);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    // }

    console.log("User success", data);
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
