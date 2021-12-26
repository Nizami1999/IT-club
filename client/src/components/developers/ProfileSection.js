/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { getProfiles } from "../../actions/profile";
import Profiles from "./Profiles";

const ProfileSection = () => {
  const dispatch = useDispatch();
  let filteredProfiles = null;

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const { profiles, loading } = useSelector((state) => state.profile);

  // Filter profiles
  if (profiles) {
    filteredProfiles = profiles.filter(
      (profile) =>
        profile.user.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
    );
  }

  return loading || profiles === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <input
        type="search"
        id="form1"
        class="form-control search-input"
        placeholder="Search..."
        aria-label="Search"
        value={text}
        onChange={(e) => onChange(e)}
      />
      <div className="profiles">
        <Profiles profiles={filteredProfiles} />
      </div>
    </section>
  );
};

export default ProfileSection;
