import React from "react";
import Profile from "./Profile";

const Profiles = ({ profiles }) =>
  profiles.length > 0
    ? profiles.map((profile) => <Profile key={profile._id} profile={profile} />)
    : "No profiles found";

export default Profiles;
