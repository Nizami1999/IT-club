/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DbWithoutProfile from "./DbWithoutProfile";
import DbWithProfile from "./DbWithProfile";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const profileItem = useSelector((state) => state.profile);
  const userItem = useSelector((state) => state.auth);

  const { user } = userItem;
  const { profile, loading } = profileItem;

  return loading ? (
    <Spinner />
  ) : profile === null ? (
    <DbWithoutProfile user={user} />
  ) : (
    <DbWithProfile dispatch={dispatch} profile={profile} user={user} />
  );
};
export default Dashboard;
