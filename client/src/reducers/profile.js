/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILES,
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
    case GET_PROFILE:
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

    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: null,
        loading: false,
        repos: [],
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    default:
      return state;
  }
}
