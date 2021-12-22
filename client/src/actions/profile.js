import axios from "axios";
import {
  GET_MY_PROFILE,
  PROFILE_ERROR,
  ALERT_ERROR,
  ALERT_SUCCESS,
} from "./types";

export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_MY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
  }
};

export const createProfile =
  ({
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      });

      const res = await axios.post("/api/profile", body, config);

      dispatch({
        type: GET_MY_PROFILE,
        payload: res.data,
      });

      dispatch({
        type: ALERT_SUCCESS,
        payload: "Profile have been created created successfully",
      });
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
    }
  };
