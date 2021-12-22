/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const profileItem = useSelector((state) => state.profile);
  const userItem = useSelector((state) => state.auth);

  const { user } = userItem;
  const { profile, loading, errors } = profileItem;

  return loading ? (
    <Spinner />
  ) : errors && profile === null ? (
    <Fragment>
      <section className="container">
        <ToastContainer />
        <h1>Hello, {user && user.name}</h1>
        <p>You haven't setup your profile yet</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </section>
    </Fragment>
  ) : (
    <Fragment>
      <section className="container">
        <h1>Hello, {user && user.name}</h1>
      </section>
    </Fragment>
  );
};
export default Dashboard;
