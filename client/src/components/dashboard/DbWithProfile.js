import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";

const DbWithProfile = ({ dispatch, profile, user }) => {
  return (
    <section className="container">
      <ToastContainer />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      <DashboardActions />
      <ExperienceSection experiences={profile.experience} />
      <EducationSection educations={profile.education} />
      <div class="my-2">
        <button
          class="btn btn-danger"
          onClick={() => dispatch(deleteAccount())}
        >
          <i class="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
  );
};

export default DbWithProfile;
