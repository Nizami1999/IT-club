import React from "react";
import Experiences from "./Experiences";

const ExperienceSection = ({ experiences }) =>
  experiences.length > 0 && <Experiences experiences={experiences} />;

export default ExperienceSection;
