import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import Experience from "./Experience";

const Experiences = ({ experiences }) => {
  const dispatch = useDispatch();
  const onClick = (id) => {
    dispatch(deleteExperience(id));
  };

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <Experience
              key={experience._id}
              experience={experience}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Experiences;
