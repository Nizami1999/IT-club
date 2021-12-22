/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, getMyProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddExperience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addExperience(
        {
          title,
          company,
          location,
          from,
          to,
          current,
          description,
        },
        navigate
      )
    );
  };

  const { loading } = useSelector((state) => state.profile);

  return loading ? (
    <Spinner />
  ) : (
    <section className="container">
      <ToastContainer />
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            onChange={(e) => onChange(e)}
            value={title}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            onChange={(e) => onChange(e)}
            value={company}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
            value={location}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={(e) => onChange(e)}
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={() => setFormData({ ...formData, current: !current })}
              value={current}
            />
            Current Job
          </p>
        </div>
        {!current && (
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              onChange={(e) => onChange(e)}
              value={to}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={(e) => onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;
