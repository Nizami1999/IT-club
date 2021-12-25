import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import Education from "./Education";

const Educations = ({ educations }) => {
  const dispatch = useDispatch();
  const onClick = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <Fragment>
      <h2 class="my-2">Education Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => (
            <Education
              key={education._id}
              education={education}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Educations;
