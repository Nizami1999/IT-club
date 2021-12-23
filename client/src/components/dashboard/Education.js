import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const onClick = (id) => {
    dispatch(deleteEducation(id));
  };

  const educations = education.map(
    ({ school, degree, from, current, to, _id }) => (
      <tr>
        <td>{school}</td>
        <td class="hide-sm">{degree}</td>
        <td class="hide-sm">
          {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
          {current ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </td>
        <td>
          <button onClick={() => onClick(_id)} class="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    )
  );

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
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
