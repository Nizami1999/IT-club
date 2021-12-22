/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

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
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        <p>You haven't setup your profile yet</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </section>
    </Fragment>
  ) : (
    <Fragment>
      <section className="container">
        <ToastContainer />
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        <DashboardActions />
        {profile?.experience.length > 0 && (
          <Experience experience={profile.experience} />
        )}
        {profile?.education.length > 0 && (
          <Education education={profile.education} />
        )}
      </section>
    </Fragment>
  );
};
export default Dashboard;
