import axios from "axios";
import {
  GET_MY_PROFILE,
  PROFILE_ERROR,
  ALERT_ERROR,
  ALERT_SUCCESS,
  UPDATE_PROFILE,
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
  (
    {
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
    },
    edit
  ) =>
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
        payload: edit
          ? "Profile has been updated successfully"
          : "Profile has been created successfully",
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

export const addExperience =
  ({ title, company, location, from, to, current, description }, navigate) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      });

      const res = await axios.put("/api/profile/experience", body, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      navigate("/dashboard");

      dispatch({
        type: ALERT_SUCCESS,
        payload: "Profile experience has been added successfully",
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

export const addEducation =
  (
    { school, degree, fieldofstudy, from, to, current, description },
    navigate
  ) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      });

      const res = await axios.put("/api/profile/education", body, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      navigate("/dashboard");

      dispatch({
        type: ALERT_SUCCESS,
        payload: "Profile education has been added successfully",
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
