import { ALERT_ERROR, ALERT_SUCCESS } from "./types";

export const alertError = (message) => (dispatch) => {
  dispatch({
    type: ALERT_ERROR,
    payload: message,
  });
};
  
export const alertSuccess = (message) => (dispatch) => {
  dispatch({
    type: ALERT_SUCCESS,
    payload: message,
  });
};
