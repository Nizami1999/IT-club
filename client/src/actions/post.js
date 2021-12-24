import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
} from "./types";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    dispatch({ type: POST_ERROR, payload: error });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: res.data._id });
    dispatch({
      type: ALERT_SUCCESS,
      payload: "Your post has been successfully deleted",
    });
  } catch (err) {
    const error = err.response.data;
    dispatch({ type: POST_ERROR, payload: error });
  }
};

export const createPost = (text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ text });
    const res = await axios.post("/api/posts", body, config);
    dispatch({ type: CREATE_POST, payload: res.data });
    dispatch({
      type: ALERT_SUCCESS,
      payload: "Post has been successfully created",
    });
  } catch (err) {
    dispatch({ type: ALERT_ERROR, payload: "Post text is required" });
  }
};
