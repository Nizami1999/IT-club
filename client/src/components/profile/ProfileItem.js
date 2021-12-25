/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { Link } from "react-router-dom";
import { getProfile } from "../../actions/profile";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

const ProfileItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile(id));
  }, []);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <section class="container">
      <Link to="/profiles" class="btn btn-light">
        Back To Profiles
      </Link>

      <div class="profile-grid my-1">
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={profile.user.avatar}
            alt={profile.user.avatar}
          />
          <h1 class="large">{profile.name}</h1>
          <p class="lead">{profile.status}</p>
          <p>{profile.location}</p>
          <div class="icons my-1">
            {profile.social && profile.social.twitter && (
              <a href={profile.social.twitter} target="_blank" rel="noreferrer">
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.instagram && (
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.youtube && (
              <a href={profile.social.youtube} target="_blank" rel="noreferrer">
                <i class="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.facebook && (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}
          </div>
        </div>

        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">
            {profile.user.name.trim().split(" ")[0]}'s Bio
          </h2>
          <p>{profile.description}</p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div style={{ flexWrap: "wrap" }} class="skills">
            {profile.skills.length > 0 &&
              profile.skills.map((skill) => (
                <div class="p-1">
                  <i class="fa fa-check"></i> {skill}
                </div>
              ))}
          </div>
        </div>
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience.length > 0 &&
            profile.experience.map(
              ({
                title,
                company,
                location,
                from,
                to,
                current,
                description,
              }) => (
                <div>
                  <h3 class="text-dark">{company}</h3>
                  <p>
                    <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {current ? (
                      " Now"
                    ) : (
                      <Moment format="YYYY/MM/DD">{to}</Moment>
                    )}
                  </p>
                  <p>
                    <strong>Position: {title}</strong>
                    <br />
                    {location && <small>Location: {location}</small>}
                  </p>
                  <p>
                    {description && <strong>Description: {description}</strong>}
                  </p>
                </div>
              )
            )}
        </div>

        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {profile.education.length > 0 &&
            profile.education.map(
              ({
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description,
              }) => (
                <div>
                  <h3>{school}</h3>
                  <p>
                    {" "}
                    <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {current ? (
                      " Now"
                    ) : (
                      <Moment format="YYYY/MM/DD">{to}</Moment>
                    )}
                  </p>
                  <p>
                    <strong>Degree: {degree}</strong>
                  </p>
                  <p>
                    <strong>Field Of Study: {fieldofstudy}</strong>
                  </p>
                  <p>
                    {description && <strong>Description: {description}</strong>}
                  </p>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default ProfileItem;
