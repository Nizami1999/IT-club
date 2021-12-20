import { ALERT_ERROR, ALERT_SUCCESS } from "../actions/types";
import { toast } from "react-toastify";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_ERROR:
      toast.error(payload, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return {};
    case ALERT_SUCCESS:
      toast.success(payload, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return {};
    default:
      return {};
  }
}
