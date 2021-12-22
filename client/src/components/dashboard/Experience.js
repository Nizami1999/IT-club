import React, { Fragment } from "react";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const experiences = experience.map(
    ({ title, company, from, to, current }) => (
      <tr>
        <td>{company}</td>
        <td class="hide-sm">{title}</td>
        <td class="hide-sm">
          {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
          {current ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  );

  return (
    <Fragment>
      <h2 class="my-2">Experience Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
