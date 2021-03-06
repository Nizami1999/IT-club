import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">IT Club</h1>
          <p className="lead">
            Welcome to our network! Sign up, create your portfolio and
            communicate with other developers!
          </p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">
              Sign Up
            </Link>
            <Link className="btn btn-light" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
