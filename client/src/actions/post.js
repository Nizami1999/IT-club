import { GET_POSTS, POST_ERROR } from "./types";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};
