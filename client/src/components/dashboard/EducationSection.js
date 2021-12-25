import React from "react";
import Educations from "./Educations";

const EducationSection = ({ educations }) =>
  educations.length > 0 && <Educations educations={educations} />;

export default EducationSection;
