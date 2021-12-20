import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ALERT_ERROR,
  ALERT_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Regitser user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: ALERT_SUCCESS,
        payload: "User have been registered successfully",
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch({
            type: ALERT_ERROR,
            payload: error.msg,
          })
        );
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);
      console.log(res);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: ALERT_SUCCESS,
        payload: "User have been logged in successfully",
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch({
            type: ALERT_ERROR,
            payload: error.msg,
          })
        );
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Logout
export const logout = () => (dispatch) => {
  debugger;
  dispatch({
    type: LOGOUT,
  });
};