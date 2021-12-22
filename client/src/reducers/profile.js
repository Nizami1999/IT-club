/* eslint-disable import/no-anonymous-default-export */
import {
  GET_MY_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: null,
  repos: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: null,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: null,
        repos: [],
      };

    default:
      return state;
  }
}
