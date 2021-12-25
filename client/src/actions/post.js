import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  LIKE_DISLIKE_POST,
  COMMENT_POST,
} from "./types";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    // TODO
    // const error = err.response.data;
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    dispatch({ type: POST_ERROR, payload: error });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

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

export const likeDislikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({ type: LIKE_DISLIKE_POST, payload: { id, likes: res.data } });
  } catch (err) {
    dispatch({ type: ALERT_ERROR, payload: err.response.data.message });
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ comment });

    // TODO
    const res = await axios.post(`/api/posts/comment/${id}`, body, config);

    dispatch({ type: COMMENT_POST, payload: res.data });
  } catch (err) {
    debugger;
    dispatch({ type: ALERT_ERROR, payload: "Text is required" });
  }
};
