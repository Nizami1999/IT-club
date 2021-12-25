import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  LIKE_DISLIKE_POST,
  GET_POST,
  COMMENT_POST,
  DELETE_COMMENT,
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
        post: null,
      };

    case GET_POST:
      return {
        ...state,
        posts: null,
        post: payload,
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

    case LIKE_DISLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    case COMMENT_POST:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };

    default:
      return state;
  }
}
