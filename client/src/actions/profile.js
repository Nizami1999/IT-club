import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  ALERT_ERROR,
  ALERT_SUCCESS,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  GET_PROFILES,
} from "./types";

export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({ type: CLEAR_PROFILES });
    dispatch({
      type: GET_PROFILE,
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
      image,
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
        image,
      });

      const res = await axios.post("/api/profile", body, config);

      dispatch({
        type: GET_PROFILE,
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

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: ALERT_SUCCESS,
      payload: "Experience has been successfully deleted",
    });
  } catch (err) {
    dispatch({
      type: ALERT_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: ALERT_SUCCESS,
      payload: "Education has been successfully deleted",
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: ALERT_ERROR,
        payload: err.response.data,
      });
    }
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({ type: ACCOUNT_DELETED });
      dispatch({ type: CLEAR_PROFILE });
      dispatch({
        type: ALERT_SUCCESS,
        payload: "You account has been permanently deleted",
      });
    } catch (err) {
      if (err) {
        dispatch({
          type: ALERT_ERROR,
          payload: err.response.data,
        });
      }
    }
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
  }
};
