import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const onClick = (id) => {
    dispatch(deleteExperience(id));
  };

  const experiences = experience.map(
    ({ title, company, from, to, current, _id }) => (
      <tr key={_id}>
        <td>{company}</td>
        <td className="hide-sm">{title}</td>
        <td className="hide-sm">
          {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
          {current ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </td>
        <td>
          <button className="btn btn-danger" onClick={(e) => onClick(_id)}>
            Delete
          </button>
        </td>
      </tr>
    )
  );

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
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
