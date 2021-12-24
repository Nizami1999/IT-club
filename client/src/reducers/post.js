import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
} from "../actions/types";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  posts: null,
  post: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
